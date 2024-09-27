import React, { useState } from "react";
import { Button } from "@mui/material";
import { WorkoutModal } from "./workoutModal";

export const WorkoutLookup = () => {
  const [date, setDate] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null); // Holds the selected workout's data

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

  // Open and close modal handlers
  const handleOpen = (workout) => {
    setSelectedWorkout(workout);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <h1>Workout Lookup</h1>
      <div className="dateInputContainer">
        <input type="date" value={date} onChange={handleDateChange} />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(255, 51, 0)",
            color: "#fff",
            "&:hover": { backgroundColor: "#FF7350" },
          }}
          onClick={fetchWorkoutsByDate}
        >
          Fetch Workouts
        </Button>
      </div>

      <div>
        {workouts.length > 0 ? (
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id}>
                <strong>{workout.name}</strong> -{" "}
                {new Date(workout.completionDate).toLocaleDateString()}
                <Button onClick={() => handleOpen(workout)}>
                  View Details
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts found for this date.</p>
        )}
      </div>

      {/* Use the WorkoutModal component */}
      <WorkoutModal
        open={open}
        handleClose={handleClose}
        selectedWorkout={selectedWorkout}
      />
    </div>
  );
};
