import React, { useState } from "react";
import { CustomMonthLayout } from "../components/calendar";
import { FormModal } from "../components/modal";
import { AuthProvider } from "../context/AuthContext";
import { WorkoutLookup } from "../components/workoutLookup";
// import { DynamicCalendar } from "../components/dynamicCalendar";

export const CalendarPage = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (date, activity) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    setSelectedActivity(activity);
  };

  return (
    <AuthProvider>
      <div>
        {/* <DynamicCalendar/> */}
        <WorkoutLookup />
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
        <FormModal />
      </div>
    </AuthProvider>
  );
};
