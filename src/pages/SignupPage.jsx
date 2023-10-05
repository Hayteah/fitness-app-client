import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography, Link, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import backgroundImage from "../assets/images/background-signup.jpg";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
};

const paperStyle = {
  width: "100%",
  maxWidth: "400px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
};

const API_URL = import.meta.env.VITE_SERVER_URL;

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Box style={containerStyle}>
      <Typography variant="h3" gutterBottom>
        Sign Up
      </Typography>

      <Paper elevation={3} style={paperStyle}>
        <LockOutlinedIcon style={{ fontSize: 40, marginBottom: 20 }} />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={handleEmail}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={handlePassword}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={name}
          onChange={handleName}
          required
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignupSubmit}
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default SignupPage;
