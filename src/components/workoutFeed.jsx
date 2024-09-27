import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {WorkoutModal} from "./workoutModal"; 

export const WorkoutFeed = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modal handling
  const [open, setOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null); // Holds the selected workout's data

  // Open and close modal handlers
  const handleOpen = (workout) => {
    setSelectedWorkout(workout);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Fetch workouts with completionDate within the next 28 days
  useEffect(() => {
    const fetchUpcomingWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/workouts/upcoming");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWorkouts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUpcomingWorkouts();
  }, []);

  if (loading) {
    return <p>Loading workouts...</p>;
  }

  if (error) {
    return <p>Error fetching workouts: {error}</p>;
  }

  return (
    <div>
      <h1>Upcoming Workouts</h1>
      <div className="ticker">
        {workouts.length > 0 ? (
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id}>
                <strong>{workout.name}</strong> -{" "}
                {new Date(workout.completionDate).toLocaleDateString()}
                {/* Add a button to open the modal */}
                <Button onClick={() => handleOpen(workout)}
                    sx={{
                        color: "rgb(255, 51, 0)",
                        "&:hover": { backgroundColor: "#FF7350" },
                      }}>View Details</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming workouts found.</p>
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
