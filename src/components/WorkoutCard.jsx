import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function WorkoutCard ( { title, reps, load, _id } ) {
  
  return (
    <div className="WorkoutCard card">
      <Link to={`/workouts/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{reps}, {load} </p>
    </div>
  );
}

export default WorkoutCard;