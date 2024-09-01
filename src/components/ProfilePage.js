import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProfilePage.css'; // Import a CSS file for custom styles

function ProfilePage() {
  const { search } = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const queryParams = new URLSearchParams(search);

  // Extract user data from query parameters
  const name = queryParams.get('name');
  const email = queryParams.get('email');
  const phone_number = queryParams.get('phone_number');
  const designation = queryParams.get('designation');
  const photo = queryParams.get('photo'); // The photo filename or URL

  // Define the path to the user's photo
  const photoPath = photo ? `http://localhost:9000/uploads/${photo}` : '/path/to/placeholder.png'; // Adjust based on your setup
  console.log('this is the photoPath', photoPath);

  // Function to handle logout
  const handleLogout = () => {
    // Clear any authentication state or token if needed here
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="profile-container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="profile-image">
        <img src={photoPath} alt="Profile" />
      </div>
      <div className="profile-details">
        <h1>{name}</h1>
        <p><strong>Phone Number:</strong> {phone_number}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Designation:</strong> {designation}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
