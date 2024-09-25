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
} from "@mui/material";
import axios from "axios";

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
    }
  };

  const handleSubmit = () => {
    if (workoutExercises.length > 0) {
      const workoutData = {
        name,
        description,
        completionDate,
        exercises: workoutExercises,
      };

      axios
        .post("http://localhost:8081/api/workouts", workoutData)
        .then((response) => {
          console.log("Workout created:", response.data);
          alert("Workout successfully created!");
          setWorkoutExercises([]);
          setCompletionDate("");
        })
        .catch((error) => {
          console.error("Error creating workout:", error);
          alert("Error creating workout. Please try again.");
        });
    } else {
      alert("Please add at least one exercise.");
    }
  };

  return (
    <div>
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
        {/* <InputLabel>Filter by Muscle</InputLabel> */}
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
        {/* <InputLabel>Filter by Type</InputLabel> */}
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
        {/* <InputLabel>Choose Exercise</InputLabel> */}
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
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ].map((i) => (
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

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddExercise}
          >
            Add Exercise
          </Button>
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
                    <Typography>Sets: {exercise.sets || "N/A"}</Typography>
                    <Typography>Reps: {exercise.reps || "N/A"}</Typography>
                    <Typography>
                      Rest: {exercise.rest || "N/A"} seconds
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exercise.instructions}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        marginTop={2}
      >
        Create Workout
      </Button>
    </div>
  );
};
