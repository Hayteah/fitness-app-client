import React, { useState } from "react";
import { Box, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");

  const repsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const loadOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

  const handleSubmit = (e) => {
    e.preventDefault();

    const { workoutId } = props;
    const requestBody = { title, reps, load, workoutId };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/tasks`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setReps("");
        setLoad("");

        props.refreshWorkout();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box className="AddTaskContainer" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box className="AddTask" sx={{ padding: 2, textAlign: "center", width: 600 }}>
        <Typography variant="h5" mb={2}>
          Add New Exercise
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            select
            label="Reps"
            variant="outlined"
            fullWidth
            margin="normal"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          >
            <MenuItem value="">Select Reps</MenuItem>
            {repsOptions.map((rep, index) => (
              <MenuItem key={index} value={rep}>
                {rep}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Load in (kg)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          >
            <MenuItem value="">Select Load in (kg)</MenuItem>
            {loadOptions.map((weight, index) => (
              <MenuItem key={index} value={weight}>
                {weight}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" type="submit" fullWidth>
            Add Exercise
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AddTask;
