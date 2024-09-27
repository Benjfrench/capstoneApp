import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://api.api-ninjas.com/v1/exercises";
const API_KEY = "DfPjH7SAkpeXPyX/GBiY+g==EMVnIBTerldKSzdq";

const muscles = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];

const types = ["cardio", "strength", "stretching", "speed"];

export const WorkoutForm = () => {
  const { user } = useAuth();
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [rest, setRest] = useState("");
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [completionDate, setCompletionDate] = useState("");

  // State for messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedMuscle || selectedType) {
      axios
        .get(API_URL, {
          params: {
            muscle: selectedMuscle,
            type: selectedType,
          },
          headers: { "X-Api-Key": API_KEY },
        })
        .then((response) => {
          setExercises(response.data);
        })
        .catch((error) => {
          console.error("Error fetching exercises:", error);
        });
    }
  }, [selectedMuscle, selectedType]);

  const handleExerciseChange = (event) => {
    const selected = exercises.find((ex) => ex.name === event.target.value);
    setSelectedExercise(event.target.value);
    setExerciseDetails(selected);
  };

  const handleAddExercise = () => {
    if (exerciseDetails && (sets || reps || rest)) {
      setWorkoutExercises([
        ...workoutExercises,
        {
          ...exerciseDetails,
          sets: sets === "N/A" ? null : parseInt(sets, 10),
          reps: reps === "N/A" ? null : parseInt(reps, 10),
          rest: rest === "N/A" ? null : parseInt(rest, 10),
        },
      ]);
      setSelectedExercise("");
      setExerciseDetails(null);
      setSets("");
      setReps("");
      setRest("");
      // Set success message
      setSuccessMessage("Exercise added successfully!");
      setErrorMessage("");
    } else {
      // Set error message
      setErrorMessage("Please fill in all exercise details.");
      setSuccessMessage("");
    }
  };

  const handleSubmit = () => {
    if (workoutExercises.length > 0) {
      const workoutData = {
        name,
        description,
        completionDate,
        exercises: workoutExercises,
        squadId: user.squadId,
      };

      axios
        .post("http://localhost:8081/api/workouts", workoutData)
        .then((response) => {
          console.log("Workout created:", response.data);
          setSuccessMessage("Workout successfully created!");
          setErrorMessage("");
          setWorkoutExercises([]);
          setCompletionDate("");
        })
        .catch((error) => {
          console.error("Error creating workout:", error);
          setErrorMessage("Error creating workout. Please try again.");
          setSuccessMessage("");
        });
    } else {
      setErrorMessage("Please add at least one exercise.");
      setSuccessMessage("");
    }
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <h4>Name:</h4>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Workout Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          fullWidth
        />
      </FormControl>

      <h4>Description:</h4>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Workout Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          fullWidth
        />
      </FormControl>

      <h4>Workout Date:</h4>
      <FormControl fullWidth margin="normal">
        <TextField
          type="date"
          value={completionDate}
          onChange={(e) => setCompletionDate(e.target.value)}
          margin="normal"
          fullWidth
        />
      </FormControl>

      <h4>Parameters:</h4>

      <FormControl fullWidth margin="normal">
        <Select
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>Filter by muscle</em>
          </MenuItem>
          {muscles.map((muscle) => (
            <MenuItem key={muscle} value={muscle}>
              {muscle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>Filter by Type</em>
          </MenuItem>
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Select
          value={selectedExercise}
          onChange={handleExerciseChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>Choose Exercise</em>
          </MenuItem>
          {exercises.map((exercise) => (
            <MenuItem key={exercise.name} value={exercise.name}>
              {exercise.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {exerciseDetails && (
        <div>
          <Typography variant="h6">
            Details for {exerciseDetails.name}
          </Typography>
          <TextField
            label="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            margin="normal"
            fullWidth
            select
          >
            <MenuItem value="N/A">N/A</MenuItem>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            margin="normal"
            fullWidth
            select
          >
            <MenuItem value="N/A">N/A</MenuItem>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Rest (seconds)"
            value={rest}
            onChange={(e) => setRest(e.target.value)}
            margin="normal"
            fullWidth
            select
          >
            <MenuItem value="N/A">N/A</MenuItem>
            {[30, 60, 90, 120, 150, 180].map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </TextField>
        </div>
      )}

      <div>
        {workoutExercises.length > 0 && (
          <Grid container spacing={2} marginTop={2}>
            {workoutExercises.map((exercise, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{exercise.name}</Typography>
                    <Typography>Sets: {exercise.sets}</Typography>
                    <Typography>Reps: {exercise.reps}</Typography>
                    <Typography>Rest: {exercise.rest} seconds</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddExercise}
        margintop={2}
        sx={{
          backgroundColor: "rgb(255, 51, 0)",
          color: "#fff",
          "&:hover": { backgroundColor: "#FF7350" },
          margin: "2rem",
        }}
      >
        Add Exercise
      </Button>


      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        margintop={2}
        sx={{
          backgroundColor: "rgb(255, 51, 0)",
          color: "#fff",
          "&:hover": { backgroundColor: "#FF7350" },
          margin: "2rem",
        }}
      >
        Create Workout
      </Button>

      {/* Display success or error message after creating the workout */}
      {successMessage && (
        <Typography color="green" variant="body1">
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography color="red" variant="body1">
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};
