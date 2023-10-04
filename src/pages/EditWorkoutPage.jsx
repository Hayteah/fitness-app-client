import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const API_URL = import.meta.env.VITE_SERVER_URL;

function EditWorkoutPage(props) {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");

  const navigate = useNavigate();
  const { workoutId } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/workouts/${workoutId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneWorkout = response.data;
        setTitle(oneWorkout.title);
        setReps(oneWorkout.reps);
        setLoad(oneWorkout.load);
      })
      .catch((error) => console.log(error));
  }, [workoutId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, reps, load };

    const storedToken = localStorage.getItem("authToken");

    axios
      .put(`${API_URL}/api/workouts/${workoutId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/workouts/${workoutId}`);
      });
  };

  const deleteWorkout = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${API_URL}/api/workouts/${workoutId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => navigate("/workouts"))
      .catch((err) => console.log(err));
  };

  return (
    <Box
      className="EditWorkoutPageContainer"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box className="EditWorkoutPage" p={3} sx={{ width: 400 }}>
        <Typography variant="h5" mb={2}>
          Edit Workout
        </Typography>

        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />

          <Box mt={2}>
            <Typography variant="body1">Reps:</Typography>
            <Select
              variant="outlined"
              fullWidth
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            >
              <MenuItem value="">Select Reps</MenuItem>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rep, index) => (
                <MenuItem key={index} value={rep}>
                  {rep}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box mt={2}>
            <Typography variant="body1">Load:</Typography>
            <Select
              variant="outlined"
              fullWidth
              value={load}
              onChange={(e) => setLoad(e.target.value)}
            >
              <MenuItem value="">Select Load</MenuItem>
              {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70].map(
                (weight, index) => (
                  <MenuItem key={index} value={weight}>
                    {weight}
                  </MenuItem>
                )
              )}
            </Select>
          </Box>

          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Update Workout
          </Button>
        </form>

        <Button
          variant="outlined"
          onClick={deleteWorkout}
          fullWidth
          sx={{ mt: 2 }}
        >
          Delete Workout
        </Button>
      </Box>
    </Box>
  );
}

export default EditWorkoutPage;
