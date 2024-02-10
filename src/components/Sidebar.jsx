import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FinancialBox from "../atoms/FinancialBox";


function Sidebar() {
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");
  const resetStyles = {
    color: "inherit",
    textDecoration: "none", // Remove underlines
  };
  return (
    <div className="bg-black h-100 sidebar p-2">
      <div>
  
        <FinancialBox />
      </div>
      <hr className="text-light" />
      <div className="list-group list-group-flush">
        <div className="list-group-item py-2 bg-dark test-white ">
          <i className="bi bi-house-door text-white fs-5 me-1"></i>
          <NavLink to="/dashboard"  aria-current="page" style={resetStyles}>
            <span className="fs-5 text-white">Dashboard</span>
          </NavLink>
        </div>
        {userType === "1" && <div className="list-group-item py-2 px-2 bg-dark text-white ">
          <i className="bi bi-speedometer2 fs-5 me-1"></i>
          <NavLink
            to="/controlandmonitor"
            aria-current="page"
            style={resetStyles}
          >
            <span className="fs-5"> Control & Monitor</span>
          </NavLink>
        </div>}
        

        <div className="list-group-item py-2 bg-dark text-white hover:bg-primary  ">
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
