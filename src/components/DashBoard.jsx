import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Navbar from './Navbar'

const TermsConditionsDialog = ({ isOpen, onAccept, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Terms & Conditions</h2>
        <p>Please read and accept the terms & conditions before proceeding.</p>
        <div className="modal-buttons">
          <button onClick={onAccept}>Accept</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAccepted, setDialogAccepted] = useState(false);
  const navigation = useNavigate();

  const handleLogout = async () => {
    if (localStorage.getItem('authToken') !== null) {
      try {
        const response = await fetch('http://localhost:5850/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          localStorage.removeItem('authToken');
          localStorage.clear();
          console.log('Successfully logged out');
          navigation('/');
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error.message);
      }
    }
  };

  useEffect(() => {
    const checkToken = () => {
      let homeCheck = window.location.href.split("/");
      if (localStorage.getItem('authToken') === null && homeCheck[3] === "dashboard") {
        navigation('/');
      } else if (localStorage.getItem("authToken")) {
        const decodedToken = jwtDecode(localStorage.getItem("authToken"));
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          console.log('Token has expired');
          localStorage.removeItem('authToken');
          navigation('/');
        } else {
          setToken(localStorage.getItem("authToken"));
        }
      }
    };

    checkToken();
  }, [navigation]);

  useEffect(() => {
    const termsAccepted = localStorage.getItem('termsAccepted');
    if (!termsAccepted) {
      setShowDialog(true);
    } else {
      setDialogAccepted(true);
    }
  }, []);

  const handleCloseDialog = () => {
    setShowDialog(false);
    if (!dialogAccepted) {
      navigation('/');
    }
  };

  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true');
    setShowDialog(false);
    setDialogAccepted(true);
  };
  
  return (
    <div className="container" >
      <Navbar/>
      <h1>Welcome to DashBoard</h1>
      <TermsConditionsDialog isOpen={showDialog} onAccept={handleAcceptTerms} onCancel={handleCloseDialog} />
      {dialogAccepted && (
        <>
          <button className='log ' onClick={handleLogout}>Logout</button>

        </>
      )}
    </div>
  );
};

export default Dashboard;
