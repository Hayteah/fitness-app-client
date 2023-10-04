import React, { useState } from "react";
import { Box, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

function AddWorkout(props) {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");

  const repsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const loadOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, reps, load };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/workouts`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setReps("");
        setLoad("");
        props.refreshWorkouts();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box className="AddWorkout" sx={{ p: 2 }}>
      <Typography variant="h5" mb={2}>
        Create New Workout
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Select
          label="Reps"
          variant="outlined"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          fullWidth
          displayEmpty
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>Select Reps</MenuItem>
          {repsOptions.map((rep, index) => (
            <MenuItem key={index} value={rep}>
              {rep}
            </MenuItem>
          ))}
        </Select>

        <Select
          label="Load in (kg)"
          variant="outlined"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          fullWidth
          displayEmpty
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>Select Load</MenuItem>
          {loadOptions.map((weight, index) => (
            <MenuItem key={index} value={weight}>
              {weight}
            </MenuItem>
          ))}
        </Select>

        <Button variant="contained" type="submit">
          Add Workout
        </Button>
      </form>
    </Box>
  );
}

export default AddWorkout;
