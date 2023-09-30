import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_SERVER_URL;

function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleProfileFetch = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/profile/`, {
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
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleUpdateProfile = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/profile/`, updatedUser, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        handleProfileFetch();
        setShowEditForm(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="ProfileContainer">
      hello world
      <div className="ProfileContentWrapper">
        <h3>{user.name}</h3>
        <h4>{user.email}</h4>
      </div>
    </div>
  );
}

export default ProfilePage;
