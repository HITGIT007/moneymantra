import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import "../css/SignUp.css"; // Reusing the same CSS for consistency

// Replace with the actual image URLs
const logoUrl = "../";

function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle contact form logic here
    const contactData = {
      name,
      email,
      phoneNumber,
      message,
    };
    console.log(contactData);
    // You would typically send this data to a server or email service
  };
  return (
    <div className="container-fluid">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src={require("../assets/images/mmremovebg.png")}
              alt="logo"
              width="100"
            />
          </Link>
          <div>
            <h1>Moneymantra AI</h1>
          </div>
          <div className="d-flex">
            <Link to="/login" className="btn btn-outline-secondary me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      <div className="row">
        <div className="col-lg-6 p-5 gradient_background_reverse d-flex flex-column justify-content-center">
          <h1>Strategize Wealth, Maximize Growth.</h1>

          <p>
            Money Mantra is a cutting-edge financial platform dedicated to
            empowering investors with smart, data-driven strategies for the
            stock market. At the heart of our mission lies a commitment to
            democratizing financial success through the use of advanced
            artificial intelligence. We provide both novice traders and seasoned
            investors with the tools they need to make informed decisions,
            minimize risk, and capitalize on growth opportunities. With Money
            Mantra, you gain a trusted partner in your financial journey,
            ensuring that every move you make is backed by expertise and
            precision, paving your path to financial prosperity.
          </p>

          <Link to="/signup" className="btn btn-light">
            Sign Up for free!
          </Link>
        </div>
        <div className="col-lg-6 d-flex flex-column align-items-center gradient_background justify-content-center">
          <h2 className="text-uppercase text-center mt-1">Contact Us</h2>

          <form
            onSubmit={handleSubmit}
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "2px solid #e7e7e7",
              marginTop:"0.5rem",
              marginBottom: "0.5rem"
            }}
          >
            <div className="form-outline mb-2">
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="name">
                Your Name
              </label>
            </div>

            {/* Email Field */}
            <div className="form-outline mb-2">
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="email">
                Your Email
              </label>
            </div>

            {/* Phone Number Field */}
            <div className="form-outline mb-2">
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="phoneNumber">
                Phone Number
              </label>
            </div>

            {/* Message Textarea */}
            <div className="form-outline mb-2">
              <textarea
                className="form-control"
                id="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <label className="form-label" htmlFor="message">
                Your Message
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary btn-block">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <footer
        className="text-center text-lg-start bg-light text-muted "
        style={{
        
          width: "100%",
          borderTop: "1px solid #e7e7e7",
        }}
      >
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Moneymantra AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
