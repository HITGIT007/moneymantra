import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/App.css"; // Assuming you want to use the same CSS file

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error message
  const [role, setRole] = useState("2");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Hardcoded credentials
    // const hardcodedEmail = 'test@gmail.com';
    // const hardcodedPassword = 'test1328';
    // sessionStorage.setItem('logged', 'true');
    // navigate('/dashboard');
    // Check if credentials match
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(email);
    const loginData = isEmail
    ? { email: email, password: password, userType: role }
    : { username: email, password: password, userType: role };
    try {
      const response = await axios.post(
        "https://moneymantraai.com/api/auth/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Signup successful:", response.data);

      // Check for successful response status
      if (response.status === 200 || response.status === 201) {
        // Store the token in sessionStorage
        const token = response.data.token;
        const userId = response.data.userId;
        const name = response.data.name;
        sessionStorage.setItem("logged", "true");
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("name", name);
        

        // Navigate to Dashboard on successful login
        navigate("/dashboard");
        // Additional successful signup logic
      }
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error
      );
      // Handle signup error (e.g., display error message)
    }
  };

  return (
    <div
      className="gradient_background"
      style={{
        borderRadius: "15px",
        height: "100vh",
      }}
    >
      <Link to="/" className="navbar-brand">
        <img
          src={require("../assets/images/mmremovebg.png")}
          alt="logo"
          width="100"
        />
      </Link>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card p-2" style={{ borderRadius: "15px" }}>
                <div className="card-body p-2">
                  <h3 className="text-uppercase text-center mb-2">Login</h3>

                  <form onSubmit={handleSubmit} style={{}}>
                    {/* Email Address */}
                    <div className="form-outline mb-3">
                      <input
                       
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="email">
                        Email / Username
                      </label>
                    </div>

                    {/* Password */}
                    <div className="form-outline mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="password">
                        Password
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
                    <option value="2">User</option>
                    <option value="1">Admin</option>
                  </select>
                  <label className="form-label" htmlFor="role">
                    Role
                  </label>
                </div>
                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary btn-block">
                      Login
                    </button>
                    <div className="text-center mt-3 mb-3">
                      <Link to="/forgot-password" className="text-body">
                        <small>Forgot Password?</small>
                      </Link>
                    </div>
                    {/* Sign Up Link */}
                    <div className="text-center mt-3">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-body">
                        <u>Sign Up</u>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
