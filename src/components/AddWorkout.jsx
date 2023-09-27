import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddWorkout(props) {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, reps, load };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URL}/api/workouts`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setTitle("");
        setReps("");
        setLoad("");
        props.refreshWorkouts();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddWorkout">
      <h3>Add Workout</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Reps:</label>
        <textarea
          type="number"
          name="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <label>Load:</label>
        <textarea
          type="number"
          name="load"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddWorkout;
