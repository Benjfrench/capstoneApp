import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, Card, CardContent } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const WorkoutModal = ({ open, handleClose, selectedWorkout }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInstructionsMap, setShowInstructionsMap] = useState({});

  useEffect(() => {
    const fetchExercises = async () => {
      if (selectedWorkout) {
        try {
          const response = await fetch(`http://localhost:8081/api/exercises/workout/${selectedWorkout.id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setExercises(data);
        } catch (err) {
          console.error("Error fetching exercises:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExercises();
  }, [selectedWorkout]);

  const toggleInstructions = (exerciseId) => {
    setShowInstructionsMap((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="workout-modal-title"
      aria-describedby="workout-modal-description"
    >
      <Box sx={modalStyle}>
        {selectedWorkout && (
          <>
            <Typography id="workout-modal-title" variant="h6" component="h2">
              {selectedWorkout.name}
            </Typography>
            <Typography id="workout-modal-description" sx={{ mt: 2 }}>
              Description: {selectedWorkout.description}
            </Typography>
            <Typography>
              Date: {new Date(selectedWorkout.completionDate).toLocaleDateString()}
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Exercises:
            </Typography>

            {loading ? (
              <p>Loading exercises...</p>
            ) : error ? (
              <p>Error fetching exercises: {error}</p>
            ) : (
              <div>
                {exercises.length > 0 ? (
                  exercises.map((exercise) => {
                    return (
                      <Card key={exercise.id} sx={{ mt: 2 }}>
                        <CardContent>
                          <Typography variant="h6">{exercise.name}</Typography>
                          <Typography color="text.secondary">Reps: {exercise.reps}</Typography>
                          <Typography color="text.secondary">Sets: {exercise.sets}</Typography>
                          <Typography color="text.secondary">Rest: {exercise.rest} seconds</Typography>

                          <Typography
                            color="primary"
                            sx={{ cursor: 'pointer', mt: 1 }}
                            onClick={() => toggleInstructions(exercise.id)}
                          >
                            {showInstructionsMap[exercise.id] ? "Hide Instructions" : "Show Instructions"}
                          </Typography>

                          {showInstructionsMap[exercise.id] && (
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                              Instructions: {exercise.instructions}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <p>No exercises found for this workout.</p>
                )}
              </div>
            )}
            <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
          </>
        )}
      </Box>
    </Modal>
  );
};
