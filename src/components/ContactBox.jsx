import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/App.css"; // Reusing the same CSS for consistency

function ContactPage() {
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
    <div
      className="d-flex flex-column align-items-center normal_background"
      style={{ height: "100%" }}
    >
      <h2 className="text-uppercase text-center mb-1">Contact Us</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
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
            className="form-control form-control-lg"
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
            className="form-control form-control-lg"
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
        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
