import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css'; // Assuming you want to use the same CSS file

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error message
  const navigate = useNavigate(); 


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Hardcoded credentials
    const hardcodedEmail = 'test@gmail.com';
    const hardcodedPassword = 'test1328';

    // Check if credentials match
    if (email === hardcodedEmail && password === hardcodedPassword) {
      sessionStorage.setItem('logged', 'true');
      // Navigate to Dashboard on successful login
      navigate('/dashboard');
    } else {
      // Set error message if login is not successful
      setError('The email address or password you entered is incorrect.');
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
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card p-2" style={{ borderRadius: "15px" }}>
                <div className="card-body p-2">
                  <h3 className="text-uppercase text-center mb-2">
                    Login
                  </h3>

                  <form onSubmit={handleSubmit} style={{}}>
                    {/* Email Address */}
                    <div className="form-outline mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="email">
                        Email address
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
                    
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                    >
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
