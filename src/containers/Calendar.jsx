import React, { useState } from "react";
import { CustomMonthLayout } from "../components/calendar";

export const CalendarPage = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (date, activity) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
    setSelectedActivity(activity);
  };

  return (
    <div>
      <CustomMonthLayout onDayClick={handleDayClick} />

      {/* Display the activity for the selected day */}
      {selectedDate && (
        <div>
          <h3>Selected Date: {selectedDate}</h3>
          {selectedActivity ? (
            <p>Activity: {selectedActivity}</p>
          ) : (
            <p>No activity for this day.</p>
          )}
        </div>
      )}
    </div>
  );
};
