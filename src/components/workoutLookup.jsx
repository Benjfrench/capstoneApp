import React, { useState } from "react";

export const WorkoutLookup = () => {
  const [date, setDate] = useState("");
  const [workouts, setWorkouts] = useState([]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchWorkoutsByDate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/workouts/byDate/${date}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  return (
    <div>
      <h1>Workout Lookup</h1>
      <input type="date" value={date} onChange={handleDateChange} />
      <button onClick={fetchWorkoutsByDate}>Fetch Workouts</button>

      <div>
        {workouts.length > 0 ? (
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id}>
                <strong>{workout.name}</strong> -{" "}
                {new Date(workout.completionDate).toLocaleDateString()}
                <p>{workout.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts found for this date.</p>
        )}
      </div>
    </div>
  );
};


