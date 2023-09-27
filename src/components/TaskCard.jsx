// We are deconstructing the props object directly in the parentheses of the function
function TaskCard({ title, reps, load }) {
  return (
    <div className="TaskCard card">
      <h3>{title}</h3>
      <h4>Reps:</h4>
      <p>{reps}</p>
      <h4>Load:</h4>

      <p>{load}</p>
    </div>
  );
}

export default TaskCard;

