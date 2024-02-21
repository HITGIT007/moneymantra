import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Nav({ name, toggleSidebar, isSidebarVisible }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours.toString().padStart(2, "0") : "12"; // the hour '0' should be '12'
    return `${day}/${month}/${year}`;
  };
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours.toString().padStart(2, "0") : "12"; // the hour '0' should be '12'
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark plain-background text-white sticky-top w-full px-3">
      <i
        className={`navbar-brand bi ${
          isSidebarVisible ? "bi-x-lg" : "bi-justify-left"
        } border rounded border-danger px-2 py-1`}
        onClick={toggleSidebar}
      ></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdownId"
              data-bs-theme='dark'
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="h5 mb-0 text-white px-3 neon-text">
                WELCOME {name.toUpperCase()}
              </span>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId" data-bs-theme='dark'>
              <button className="dropdown-item">Profile</button>
              <button className="dropdown-item">Setting</button>
              <button
                className="dropdown-item"
                onClick={() => {
                  sessionStorage.removeItem("logged");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div className="ms-auto text-white d-flex align-items-center">
        <div className="me-3 neon-text text-white px-2 py-2 rounded ">
          <span className="h5 fw-bold mb-0">{formatDate(currentTime)}</span>
        </div>
        <div className="px-2 py-2  rounded     ">
          <span className="h5 mb-0 fw-bold neon-text">{formatTime(currentTime)}</span>
        </div>
      </div>
    </nav>
  );
}

export default React.memo(Nav);
