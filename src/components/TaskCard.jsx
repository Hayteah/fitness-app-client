import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function TaskCard({ title, reps, load }) {
  return (
    <Box className="TaskCard card" p={2} borderRadius={4} boxShadow={2} sx={{ display: "inline-block", marginRight: 2 }}>
      <Typography variant="h5" mb={1} sx={{ color: "red" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Reps:
      </Typography>
      <Typography variant="body1" mb={1}>
        {reps}
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Load in (kg):
      </Typography>
      <Typography variant="body1">{load}</Typography>
    </Box>
  );
}

export default TaskCard;
