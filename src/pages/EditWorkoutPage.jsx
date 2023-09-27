import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = "http://localhost:5005";

function EditWorkoutPage(props) {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("")

  const navigate =  useNavigate();
  const { workoutId } = useParams();
  
  
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    
    axios
      .get(
        `${API_URL}/api/workouts/${workoutId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }    
      )
      .then((response) => {
        const oneWorkout = response.data;
        setTitle(oneWorkout.title);
        setReps(oneWorkout.reps);
        setLoad(oneWorkout.load)
      })
      .catch((error) => console.log(error));
    
  }, [workoutId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, reps, load };
  
    const storedToken = localStorage.getItem('authToken');  

    axios
      .put(
        `${API_URL}/api/workouts/${workoutId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }              
      )
      .then((response) => {
        navigate(`/workouts/${workoutId}`)
      });
  };
  
  
  const deleteWorkout = () => {
    const storedToken = localStorage.getItem('authToken');      
    
    axios
      .delete(
        `${API_URL}/api/workouts/${workoutId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }           
      )
      .then(() => navigate("/workouts"))
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditWorkoutPage">
      <h3>Edit Workout</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Reps:</label>
        <textarea
          name="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

<label>Load:</label>
        <textarea
          name="load"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
        />

        <button type="submit">Update Workout</button>
      </form>

      <button onClick={deleteWorkout}>Delete Workout</button>
    </div>
  );
}

export default EditWorkoutPage;