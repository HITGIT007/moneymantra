import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "../css/App.css";
function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle sign-up logic here
    if (password !== confirmPassword) {
      // Display an error message or handle the mismatch
      alert("Passwords do not match.");
      return;
    }
    const userData = {
      username: username,
      name: fullName,
      email:email,
      mobile:phoneNumber,
      password: password,
      userType: role === "admin" ? "1" : "2",
    };
    console.log(
      "userData================================================>",
      userData
    );
    try {
      const response = await axios.post('https://moneymantraai.com/api/auth/signup', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Signup successful:", response.data);
      // Handle successful signup (e.g., redirect to login page)
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error);
      // Handle signup error (e.g., display error message)
    }
  };

  return (
    <div
      className="gradient_background"
      style={{
        borderRadius: "15px",
        height:"100vh"
      }}
    >
      <Link to="/" className="navbar-brand">
            <img
              src={require("../assets/images/mmremovebg.png")}
              alt="logo"
              width="100"
            />
          </Link>
        
        <div  className="d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-3">
                 

                  <form onSubmit={handleSubmit} style={{}}>
                    <div className="form-outline mb-2">
                      <input
                        type="text"
                        className="form-control "
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="fullName">
                        Full Name
                      </label>
                    </div>
                    <div className="form-outline mb-2">
                      <input
                        type="text"
                        className="form-control "
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="username">
                        Username
                      </label>
                    </div>

                    {/* Email Address */}
                    <div className="form-outline mb-2">
                      <input
                        type="email"
                        className="form-control "
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="email">
                        Email address
                      </label>
                    </div>

                    {/* Phone Number */}
                    <div className="form-outline mb-2">
                      <input
                        type="tel"
                        className="form-control "
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="phoneNumber">
                        Phone Number
                      </label>
                    </div>

                    {/* Password */}
                    <div className="form-outline mb-2">
                      <input
                        type="password"
                        className="form-control "
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>

                    {/* Confirm Password */}
                    <div className="form-outline mb-2">
                      <input
                        type="password"
                        className="form-control "
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                    </div>

                    {/* Role Selection */}
                    <div className="form-outline mb-2">
                      <select
                        className="form-select "
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      >
                        
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <label className="form-label" htmlFor="role">
                        Role
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                    >
                      Sign Up
                    </button>

                    {/* Login Link */}
                    <div className="text-center mt-3">
                      Already have an account?{" "}
                      <Link to="/login" className="text-body">
                        <u>Login</u>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
       
            </div>
   
    </div>
  );
}

export default SignUpPage;
