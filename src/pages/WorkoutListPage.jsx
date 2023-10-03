import React, { useState, useEffect } from "react";
import axios from "axios";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/WorkoutCard";


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
    <div className="container">
      <div className="paper">
        <h2>Workout List</h2>
       
        <AddWorkout refreshWorkouts={getAllWorkouts} />
      </div>

      <div className="cardContainer">
        {workouts.map((workout) => (
          <div key={workout._id} className="card">
            <WorkoutCard {...workout} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutListPage;
