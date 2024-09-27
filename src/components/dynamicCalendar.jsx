import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

export const DynamicCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [workoutDates, setWorkoutDates] = useState([]);

  useEffect(() => {
    // Fetch workouts for the selected date whenever the value changes
    async function fetchWorkoutsByDate(selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
      try {
        const response = await fetch(`http://localhost:8081/api/workouts/byDate/${formattedDate}`);
        if (!response.ok) throw new Error('Failed to fetch workouts');
        const data = await response.json();
        setWorkoutDates(data.map(workout => new Date(workout.completionDate)));
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    }

    fetchWorkoutsByDate(value);
  }, [value]);

  // Change tile appearance if there's a workout on that day
  function tileClassName({ date, view }) {
    if (view === 'month' && workoutDates.find(d => d.toDateString() === date.toDateString())) {
      return 'highlight';
    }
    return null;
  }

  return (
    <Calendar
      onChange={setValue}
      value={value}
      tileClassName={tileClassName}
    />
  );
};
