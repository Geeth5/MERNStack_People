import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    gender: '',
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('/api/users/update');
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sends updated profile data
      await axios.put('/api/users/updateProfile', profileData);
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={profileData.name} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="gender" value={profileData.gender} onChange={handleInputChange} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Settings;
