import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import { Box, Button, Typography } from "@mui/material";


import TaskCard from "../components/TaskCard";

const API_URL = import.meta.env.VITE_SERVER_URL;


function WorkoutDetailsPage (props) {
  const [workout, setWorkouts] = useState(null);
  const { workoutId } = useParams();
  
  
  const getWorkout = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/workouts/${workoutId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneWorkout = response.data;
        setWorkouts(oneWorkout);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getWorkout();
  }, [] );

  
  return (
    <div className="WorkoutDetails">
      {workout && (
        <>
          <Typography variant="h1">{workout.title}</Typography>
          <Typography variant="body1">{workout.reps}</Typography>
          <Typography variant="body1">{workout.load}</Typography>
        </>
      )}

      <AddTask refreshWorkout={getWorkout} workoutId={workoutId} />

      {workout &&
        workout.tasks.map((task) => <TaskCard key={task._id} {...task} />)}

      <Box mt={2}>
        <Link to="/workouts" style={{ textDecoration: "none" }}>
          <Button variant="contained">Back to workouts</Button>
        </Link>
      </Box>

      <Box mt={2}>
        <Link to={`/workouts/edit/${workoutId}`} style={{ textDecoration: "none" }}>
          <Button variant="contained">Edit Workout</Button>
        </Link>
      </Box>
    </div>
  );
}

export default WorkoutDetailsPage;