import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");

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
      <h3>Add New Task</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Reps:</label>
        <input
          type="number"
          name="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <label>Load:</label>
        <input
          type="number"
          name="load"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
