import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");

  const repsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Example reps options
  const loadOptions = [5, 10, 15, 20, 25, 30, 35, 40]; // Example load options in kg

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
    <div className="AddTask">
      <h3>Add New Exercise</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Reps :</label>
        <select value={reps} onChange={(e) => setReps(e.target.value)}>
          <option value="">Select Reps</option>
          {repsOptions.map((rep, index) => (
            <option key={index} value={rep}>
              {rep}
            </option>
          ))}
        </select>

        <label>Load in (kg):</label>
        <select value={load} onChange={(e) => setLoad(e.target.value)}>
          <option value="">Select Load</option>
          {loadOptions.map((weight, index) => (
            <option key={index} value={weight}>
              {weight}
            </option>
          ))}
        </select>

        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
}

export default AddTask;
