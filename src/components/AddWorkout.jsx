import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

function AddWorkout(props) {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");

  const repsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Example reps options
  const loadOptions = [5, 10, 15, 20, 25, 30,35, 40, 45, 50,55, 60,65, 70,]; // Example load options

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
        <select value={reps} onChange={(e) => setReps(e.target.value)}>
          <option value="">Select Reps</option>
          {repsOptions.map((rep, index) => (
            <option key={index} value={rep}>
              {rep}
            </option>
          ))}
        </select>

        <label>Load:</label>
        <select value={load} onChange={(e) => setLoad(e.target.value)}>
          <option value="">Select Load</option>
          {loadOptions.map((weight, index) => (
            <option key={index} value={weight}>
              {weight}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddWorkout;
