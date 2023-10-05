import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Typography, Box, Avatar } from "@mui/material";
import HomeLogo from "../assets/images/home-logo.jpg";

const homeLogoStyle = {
  width: "70px",
  height: "auto",
};
function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

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
        <img src={HomeLogo} alt="Home Logo" style={homeLogoStyle} />
      </Link>

     
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Link to="/">
          <Button variant="contained">Home</Button>
        </Link>

       
        {isLoggedIn && (
          <>
            <Link to="/workouts">
              <Button variant="contained">Workouts</Button>
            </Link>

            <Link to="/userprofile">
              <Button variant="contained">UserProfile</Button>
            </Link>

            <Button variant="contained" onClick={logOutUser}>
              Logout
            </Button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <Button variant="contained">Sign Up</Button>
            </Link>
            <Link to="/login">
              <Button variant="contained">Login</Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
