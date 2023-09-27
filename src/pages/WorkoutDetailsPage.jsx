import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";

import TaskCard from "../components/TaskCard";

const API_URL = "http://localhost:5005";


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
          <h1>{workout.title}</h1>
          <p>{workout.reps}</p>
          <p>{workout.load}</p>

        </>
      )}

      
      <AddTask refreshWorkout={getWorkout} workoutId={workoutId} />          

      { workout && workout.tasks.map((task) => <TaskCard key={task._id} {...task} /> )} 

      <Link to="/workouts">
        <button>Back to workouts</button>
      </Link>
          
      <Link to={`/workouts/edit/${workoutId}`}>
        <button>Edit Workout</button>
      </Link>
      
    </div>
  );
}

export default WorkoutDetailsPage;