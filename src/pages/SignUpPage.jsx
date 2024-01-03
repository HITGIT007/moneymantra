import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";
import "../css/App.css";
function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("2");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [pan, setPan] = useState("");
  const navigate = useNavigate(); 
  //m0n3YM@n2RA
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
      email: email,
      mobile: phoneNumber,
      password: password,
      userType: role,
      ...(role === "2" && { pan: pan }),
      ...(role === "1" && { adminPassword: adminPassword }),
      ...(role === "2" && { apiKey: "wwqeqwew" }),
      ...(role === "2" && { apiSecret: "weqwweqqe" }),
    };
    console.log(
      "userData================================================>",
      userData
    );
    try {
      const response = await axios.post("https://moneymantraai.com/api/auth/signup", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Signup successful:", response.data);

      // Check for successful response status
      if(response.status === 200 || response.status === 201) {
        // Store the token in sessionStorage
        const token = response.data.token;
        sessionStorage.setItem('logged', 'true');
        sessionStorage.setItem('token', token);

        // Navigate to Dashboard on successful login
        navigate('/dashboard');
        // Additional successful signup logic
      }
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error);
      // Handle signup error (e.g., display error message)
    }
      // Handle signup error (e.g., display error message)
    
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

      <div className="d-flex justify-content-center align-items-center">
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
                    <option value="2">User</option>
                    <option value="1">Admin</option>
                  </select>
                  <label className="form-label" htmlFor="role">
                    Role
                  </label>
                </div>
                {role === "1" && (
                  <div className="form-outline mb-2">
                    <input
                      type="password"
                      className="form-control "
                      id="adminpassword"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="password">
                      Admin Password
                    </label>
                  </div>
                )}
                {role === "2" && (
                  <div className="form-outline mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="pan"
                      value={pan}
                      onChange={(e) => setPan(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="pan">
                      PAN
                    </label>
                  </div>
                )}
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-block">
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
