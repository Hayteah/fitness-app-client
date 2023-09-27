import { useState, useEffect } from "react";
import axios from "axios";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/WorkoutCard";

const API_URL = "http://localhost:5005";

function WorkoutListPage() {
  const [workouts, setWorkouts] = useState([]);

  const getAllWorkouts = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/workouts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setWorkouts(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllWorkouts();
  }, []);

  return (
    <div className="WorkoutListPage">
      <AddWorkout refreshWorkouts={getAllWorkouts} />

      {workouts.map((workout) => (
        <WorkoutCard key={workout._id} {...workout} />
      ))}
    </div>
  );
}

export default WorkoutListPage;
