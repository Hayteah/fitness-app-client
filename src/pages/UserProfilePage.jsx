import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

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
    // formData.append("avatar", avatar);
    if (updatedUser.imageFile) {
      formData.append("avatar", updatedUser.imageFile);
    }
    axios
      .put(`${API_URL}/userprofile/`, formData, {
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

  const onEditButtonClick = () => {
    setIsFormEditable(!isFormEditable);
  };

  console.log(updatedUser, " state");

  return (
    <div className="ProfileContainer">
      <form onSubmit={handleUpdateProfile} className="ProfileContentWrapper">
        <div>
          {isFormEditable && (
            <>
              <label>Image:</label>
              <input
                readOnly={!isFormEditable}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />
            </>
          )}
          {updatedUser.image && (
            <img src={updatedUser.image} width="200px" height="200px" />
          )}
        </div>
        <div>
          <label>Name:</label>
          <input
            readOnly={!isFormEditable}
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            readOnly={!isFormEditable}
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
          />
        </div>
        {isFormEditable ? (
          <button type="submit">Save Changes</button>
        ) : (
          <input
            type="button"
            onClick={onEditButtonClick}
            value="Edit Profile"
          />
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
