import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Typography, Box, Avatar } from "@mui/material";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const checkThisButtton = () => {
    console.log("I am working!");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Link to="/">
        <Button variant="contained">Home</Button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/workouts">
            <Button variant="contained" onClick={() => checkThisButtton}>
              Workouts
            </Button>
          </Link>

          <Link to="/userprofile"></Link>

          <Link to="/">
            <Button variant="contained" onClick={logOutUser}>
              Logout
            </Button>
          </Link>

          <Link to="/userprofile">
            <Button variant="contained">UserProfile</Button>
          </Link>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Box sx={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
            <Link to="/signup">
              <Button variant="contained">Sign Up</Button>
            </Link>
            <Link to="/login">
              <Button variant="contained">Login</Button>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Navbar;
