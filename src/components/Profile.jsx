import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TermsConditionsDialog from './TermsConditionsDialog'; // Import the TermsConditionsDialog component

const Profile = () => {
  const [user, setUser] = useState({
    image: '', // Assuming you have an image URL for the user's image
    username: '', // User's username
    email: '', // User's email
  });
  const [showTermsConditions, setShowTermsConditions] = useState(false); // State to control the visibility of terms and conditions dialog

  // Function to handle accept terms and conditions
  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true');
    setShowTermsConditions(false);
  };

  // Function to handle cancel terms and conditions
  const handleCancelTerms = () => {
    setShowTermsConditions(false);
  };

  return (
    <div className="profile">
      <div className="profile-info">
        <img src={user.image} alt="User" />
        <h2>{user.username}</h2>
        <p>Email: {user.email}</p>
      </div>
      <div className="profile-actions">
        <button onClick={() => setShowTermsConditions(true)}>See T & C</button>
        <Link to="/update-profile">Update Profile</Link>
        <Link to="/change-password">Change Password</Link>
      </div>
      <TermsConditionsDialog isOpen={showTermsConditions} onAccept={handleAcceptTerms} onCancel={handleCancelTerms} />
    </div>
  );
};

export default Profile;
