import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function WorkoutCard({ title, reps, load, _id }) {
  return (
    <Box
      className="WorkoutCard card"
      p={2}
      borderRadius={4}
      boxShadow={2}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        marginRight: "20px",
      }}
    >
      <Link
        to={`/workouts/${_id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Typography variant="h5" mb={1} style={{ color: "red" }}>
          {title}
        </Typography>
      </Link>
      <Typography variant="body1" mb={1} style={{ maxWidth: "400px" }}>
        Reps: {reps}
      </Typography>
      <Typography variant="body1" style={{ maxWidth: "400px" }}>
        Load: {load}
      </Typography>
    </Box>
  );
}

export default WorkoutCard;
