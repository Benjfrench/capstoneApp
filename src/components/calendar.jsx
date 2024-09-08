import * as React from 'react';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export const CustomMonthLayout = ({ onDayClick }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [activities, setActivities] = useState({});

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    onDayClick(newDate, activities[newDate.format('YYYY-MM-DD')] || null);
  };

  const handleAddActivity = () => {
    if (!selectedDate) return;

    const activityText = `Activity for ${selectedDate.format('YYYY-MM-DD')}`;
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    setActivities({
      ...activities,
      [formattedDate]: activityText,
    });
  };

  // Function to highlight days with activities
  const shouldHighlightDay = (day) => {
    const formattedDay = day.format('YYYY-MM-DD');
    return activities[formattedDay] !== undefined;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          renderDay={(day, _value, DayComponentProps) => (
            <div
              style={{
                backgroundColor: shouldHighlightDay(day) ? '#ffeb3b' : undefined, // Highlight with yellow
                borderRadius: '50%',  // Make it look like a day highlight
              }}
              {...DayComponentProps}
            >
              {day.date()}
            </div>
          )}
        />

        {/* Button to add an activity for the selected date */}
        <button onClick={handleAddActivity} disabled={!selectedDate}>
          Add Activity
        </button>
      </div>
    </LocalizationProvider>
  );
};
