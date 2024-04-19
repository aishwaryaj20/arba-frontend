import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu'; // Import the ProfileMenu component
import './navbar.css';
const Navbar = () => {
  const [username, setUsername] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false); // State to control the visibility of the profile menu
  const navigation = useNavigate();
  // Function to toggle the profile menu visibility
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear local storage and navigate to login page
    localStorage.removeItem('authToken');
    navigation('/');
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
        
        </Link>
      </div>
      
      {/* Cart Component Logo */}
      <div className="cart-logo">
        <Link to="/cart">
        Cart
        </Link>
      </div>
      

      <div className="cart-logo">
        <Link to="/product ">Product
         
        </Link>
      </div>


      {/* ProfileMenu Logo */}
      <div className="profile-menu-logo">
      Profile
      </div>
      {showProfileMenu && <ProfileMenu />}

   
     
    </div>
  );
};

export default Navbar;
