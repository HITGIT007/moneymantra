import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import axios from "axios";
import "../css/App.css"; // Assuming you want to use the same CSS file
import { login } from "../services/api";
//import NavigationBar from "./NavigationBar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState(""); // State to hold error message
  const [role, setRole] = useState("2");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Assuming email, password, and role are defined in your component's state
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(email);
    const username = email;

    // Prepare the login data
    const loginData = isEmail
      ? { email, password, userType: role }
      : { username, password, userType: role };

    try {
      // Call the login function with username/password. Adjust the login function if necessary to accept email as well.
      const response = await login(loginData);

      console.log("Login successful:", response);

      // Navigate to Dashboard on successful login
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error
      );
      // Handle login error (e.g., display error message)
    }
  };

  return (
    <div
      className="card p-2  "
      style={{
        borderRadius: "15px",
        background: "#0a142f",
        color: "white",
      }}
    >
      <div className="card-body p-2" style={{ backgroundColor: "#0a142f" }}>
        {/* <h3 className="text-uppercase text-center mb-2">Login</h3> */}

        <form onSubmit={handleSubmit} style={{ backgroundColor: "#0a142f" }}>
          {/* Email Address */}
          <label className="form-label" htmlFor="email">
            Email / Username
          </label>
          <div className="form-outline mb-3">
            <input
              style={{ background: "#243047" }}
              className="form-control text-white"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              style={{ background: "#243047" }}
              type="password"
              className="form-control text-white"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Role Selection */}
          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="role">
              Role
            </label>
            <select
              style={{ background: "#243047" }}
              className="form-select text-white "
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="2">User</option>
              <option value="1">Admin</option>
            </select>
          </div>
          {/* Submit Button */}
          <div className="d-flex justify-content-center py-3">
            <button type="submit" className="btn btn-info  ">
              Login
            </button>
          </div>
          <div className="text-center mt-3 mb-3">
            <Link to="/forgot-password" className=" ">
              <u className="">Forgot Password?</u>
            </Link>
          </div>
          {/* Sign Up Link */}
          <div className="text-center  mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="">
              <u>Sign Up</u>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
