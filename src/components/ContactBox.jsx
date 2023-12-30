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
      

      
    </div>
  );
}

export default ContactPage;
