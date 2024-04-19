import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';
const Signup = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigation("/");
    }
  }, [navigation]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://arba-backend-nsiu.onrender.com/register",
        formData
      );

      console.log(response.data);
      alert("Registration successfully");
      navigation("/");
    } catch (error) {
      if (error.response.status === 400) {
        alert("email or phone number already registered");
      }

      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <h2 className="login_name">User Register form</h2>
      <div className="login">
        <form className="container" onSubmit={handleSubmit}>
          <input
            placeholder="FullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="UserName"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="ConformPassword"
            />
            <i
              className={`fas ${
                showConfirmPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={toggleConfirmPasswordVisibility}
            ></i>
          </div>

          <button type="submit">Register</button>
          <p>
            If you have an account? <a href="/">Login here</a>.
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
