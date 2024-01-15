import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FinancialBox from "./FinancialBox";


function Sidebar() {
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");
  const resetStyles = {
    color: "inherit",
    textDecoration: "none", // Remove underlines
  };
  return (
    <div className="bg-white sidebar p-2">
      <div>
  
        <FinancialBox />
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <div className="list-group-item py-2  ">
          <i className="bi bi-house-door fs-5 me-1"></i>
          <NavLink to="/dashboard" aria-current="page" style={resetStyles}>
            <span className="fs-5">Dashboard</span>
          </NavLink>
        </div>
        {userType === "1" && <div className="list-group-item py-2  ">
          <i className="bi bi-speedometer2 fs-5 me-1"></i>
          <NavLink
            to="/controlandmonitor"
            aria-current="page"
            style={resetStyles}
          >
            <span className="fs-5"> Control & Monitor</span>
          </NavLink>
        </div>}
        

        <div className="list-group-item py-2  ">
          <i className="bi bi-box-arrow-right fs-5 me-1"></i>
          <NavLink
            to="/controlandmonitor"
            aria-current="page"
            onClick={() => {
              sessionStorage.removeItem("logged");
              navigate("/");
            }}
            style={resetStyles}
          >
            <span className="fs-5"> Log Out</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
