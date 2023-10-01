import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const isLoggedIn = user !== null;

  const storeUserData = (token, user) => {
    setUser(user);
    localStorage.setItem("authToken", token);
    // localStorage.setItem("userInfo", JSON.stringify(user));
  };

  const authenticateUser = () => {
    setIsLoading(true);
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${API_URL}/userprofile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // If the server verifies that JWT token is valid  ✅
          const user = response.data.user;
          // Update state variables
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token) ❌
          // Update state variables
          setIsLoading(false);
          setUser(null);
        });
    }
    setIsLoading(false);
  };

  const login = (email, password) => {
    axios
      .post(`${API_URL}/auth/login`, { email, password })
      .then((response) => {
        console.log("login", response);
        storeUserData(response.data.authToken, response.data.foundUser);
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const logOutUser = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  useEffect(() => {
    // Run the function after the initial render,
    // after the components in the App render for the first time.
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        logOutUser,
        login,
        errorMessage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
