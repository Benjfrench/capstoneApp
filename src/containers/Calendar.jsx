import React, { useState } from "react";
import { CustomMonthLayout } from "../components/calendar";
import { FormModal } from "../components/modal";
import { AuthProvider } from "../context/AuthContext";
import { WorkoutLookup } from "../components/workoutLookup";
import { WorkoutFeed } from "../components/workoutFeed";
import "../App.css";

export const CalendarPage = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (date, activity) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    setSelectedActivity(activity);
  };

  return (
    <AuthProvider>
      <div className="workoutLookup">
        <WorkoutLookup />
        <WorkoutFeed/>
        {/* {selectedDate && (
          <div>
            <h3>Selected Date: {selectedDate}</h3>
            {selectedActivity ? (
              <p>Activity: {selectedActivity}</p>
            ) : (
              <p>No activity for this day.</p>
            )}
          </div>
        )} */}
        <FormModal />
      </div>
    </AuthProvider>
  );
};
