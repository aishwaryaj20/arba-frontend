import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TermsConditionsDialog from './TermsConditionsDialog'; 

const Profile = () => {
  const [user, setUser] = useState({
    image: '', 
    username: '', 
    email: '', 
  });
  const [showTermsConditions, setShowTermsConditions] = useState(false); 

  
  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true');
    setShowTermsConditions(false);
  };

 
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
