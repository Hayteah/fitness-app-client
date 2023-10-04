import React, { useState, useEffect } from "react";
import axios from "axios";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/WorkoutCard";
import { Box, Typography } from "@mui/material";

const API_URL = import.meta.env.VITE_SERVER_URL;

function WorkoutListPage() {
  const [workouts, setWorkouts] = useState([]);

  const getAllWorkouts = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/workouts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setWorkouts(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllWorkouts();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
    >
      <Box className="paper" p={3}>
        <Typography variant="h2" mb={2}>
          My Workout
        </Typography>
        <AddWorkout refreshWorkouts={getAllWorkouts} />
      </Box>

      <Box className="cardContainer" display="flex" flexWrap="wrap" gap={2}>
        {workouts.map((workout) => (
          <div key={workout._id} className="card">
            <WorkoutCard {...workout} />
          </div>
        ))}
      </Box>
    </Box>
  );
}

export default WorkoutListPage;
