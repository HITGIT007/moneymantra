import React, { useState, useEffect } from "react";

function Nav({ name, date, toggleSidebar, isSidebarVisible }) {
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
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <i
   
        className={`navbar-brand bi ${isSidebarVisible ? "bi-x-lg" : "bi-justify-left"} border rounded border-danger px-2 py-1`}
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
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="h4 mb-0 text-white px-3">
                WELCOME {name.toUpperCase()}
              </span>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <a className="dropdown-item" href="#">
                Profile
              </a>
              <a className="dropdown-item" href="#">
                Setting
              </a>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div
        className="text-white ms-3 d-flex align-items-center border border-2 rounded my-2 py-2 text-center"
        style={{ width: "150px" }}
      >
        <span className="h4 mb-0">{formatDate(date)}</span>
      </div>
    </nav>
  );
}

export default Nav;
