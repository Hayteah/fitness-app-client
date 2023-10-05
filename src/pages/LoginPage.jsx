import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Link as MuiLink,
  Avatar,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import backgroundImage from "../assets/images/anastase-maragos-9dzWZQWZMdE-unsplash.jpg"; 

const transparentBackground = "rgba(255, 255, 255, 0.2)"; 

const containerStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
};

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, errorMessage } = useContext(AuthContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <Container component="main" maxWidth="xs">
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: transparentBackground,
            backdropFilter: "blur(10px)", 
            borderRadius: 16,
            boxShadow: 5,
            padding: "20px",
          }}
        >
          <CardContent>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              gutterBottom
              style={{ color: "#fff" }}
            >
              Login
            </Typography>
            <form
              onSubmit={handleLoginSubmit}
              style={{ width: "100%", marginTop: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                InputProps={{ style: { color: "#fff" } }}
                style={{ backgroundColor: "transparent" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{ style: { color: "#fff" } }}
                style={{ backgroundColor: "transparent" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
                style={{ backgroundColor: "#1976D2", color: "#fff" }}
              >
                {loading ? (
                  <CircularProgress size={24} style={{ color: "#fff" }} />
                ) : (
                  "Login"
                )}
              </Button>
              {errorMessage && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ mb: 2 }}
                >
                  {errorMessage}
                </Typography>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <MuiLink
                    component={Link}
                    to="/signup"
                    variant="body2"
                    style={{ color: "#fff" }}
                  >
                    Don't have an account yet? Sign Up
                  </MuiLink>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
