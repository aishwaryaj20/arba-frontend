// ProfileMenu.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'
const ProfileMenu = () => {
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigation('/');
  };

  return (
    <div className="profile-menu">
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/mystore">My Store</Link>
        </li>
        <li>
          <button className='log' onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
