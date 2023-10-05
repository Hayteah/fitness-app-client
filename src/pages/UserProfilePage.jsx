import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Box, Button, Typography, TextField } from "@mui/material";

const API_URL = import.meta.env.VITE_SERVER_URL;

function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const [isFormEditable, setIsFormEditable] = useState(false);

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    image: "",
    imageFile: "",
  });

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        name: user.name,
        email: user.email,
        image: user.avatar,
      });
    }
  }, [user]);

  const handleProfileFetch = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/userprofile/`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
      image:
        name === "image" ? URL.createObjectURL(files[0]) : updatedUser.image,
      imageFile: name === "image" ? files[0] : updatedUser.imageFile,
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("email", updatedUser.email);
    formData.append("name", updatedUser.name);
    if (updatedUser.imageFile) {
      formData.append("avatar", updatedUser.imageFile);
    }
    axios
      .put(`${API_URL}/userprofile/`, formData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        handleProfileFetch();
        setIsFormEditable(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEditButtonClick = () => {
    setIsFormEditable(!isFormEditable);
  };

  return (
    <Box className="ProfileContainer" p={3}>
      <Typography variant="h2" mb={2}>
        Welcome, {user && user.name}!
      </Typography>

      <Box
        width={600}
        height={600}
        p={3}
        border="1px solid #ccc"
        borderRadius={4}
      >
        <form onSubmit={handleUpdateProfile} className="ProfileContentWrapper">
          <Box
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
            }}
            mb={2}
          >
            {isFormEditable && (
              <>
                <label>Image:</label>
                <input
                  style={{ width: "200px" }}
                  readOnly={!isFormEditable}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </>
            )}
            {updatedUser.image && (
              <img
                src={updatedUser.image}
                width="200px"
                height="200px"
                alt="Profile"
              />
            )}
          </Box>
          <Box mb={2}>
            <label>Name:</label>
            <TextField
              variant="outlined"
              fullWidth
              readOnly={!isFormEditable}
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
            />
          </Box>
          <Box mb={2}>
            <label>Email:</label>
            <TextField
              variant="outlined"
              fullWidth
              readOnly={!isFormEditable}
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
            />
          </Box>
          <Box mt={2}>
            {isFormEditable ? (
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            ) : (
              <Button variant="outlined" onClick={onEditButtonClick}>
                Edit Profile
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default ProfilePage;
