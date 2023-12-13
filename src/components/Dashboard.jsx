import React, { useState, useEffect, useLayoutEffect  } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/App.css";
import Sidebar from "./Sidebar";
import BrokerStratRow from "./BrokerStratRow";
const Dashboard = () => {

    const navigate = useNavigate();

    useLayoutEffect(() => {
      // Check for 'logged' in session storage
      const isLogged = sessionStorage.getItem('logged');
  
      // If 'logged' is not 'true', redirect to the login page
      if (isLogged !== 'true') {
        navigate('/login');
      }
    }, [navigate]); // Dependency array includes navigate to avoid re-running the effect unnecessarily


  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Toggles the visibility of the sidebar
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="d-flex gradient_background_dashboard">
      {/* Sidebar */}
      <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />

      {/* Main content section */}
      <div className="container-fluid">
        <nav className="navbar_dashboard navbar-expand-lg navbar-dark">
          
            {/* Toggle button for the sidebar */}
            <div className="d-flex align-items-center">
              <button onClick={toggleSidebar} className="btn btn-primary m-2 border border-danger">
                <i
                  className={`bi ${isSidebarVisible ? "bi-x-lg" : "bi-list"}`}
                ></i>
              </button>
              <div className="navbar-brand d-flex align-items-center">
                <span className="h2 mb-0 text-white">PP</span>
                <span className="h4 mb-0 text-white px-3">
                  WELCOME PRATEEK PRIYADARSHI
                </span>
              </div>
            </div>
         
        </nav>
        <div className="d-flex align-items-center border rounded p-4 mb-3">
          <div className="text-white d-flex align-items-center me-3">
            <span className="mx-2 h4">TOTAL PNL 0/-</span>
            <span className="mx-2 h4">|</span>
            <span className="mx-2 h4">TOTAL ORDER 0</span>
            <span className="mx-2 h4">|</span>
            <span className="mx-2 h4">Total Strategies: 2</span>
          </div>
          <button className="btn btn-outline-light d-flex align-items-center">
            Create New <i className="bi bi-plus-lg ms-2"></i>
          </button>
          <div className="text-white ms-3 d-flex align-items-center">
            <span className="h4 mb-0">{currentTime.toLocaleString()}</span>
          </div>
        </div>
        <div className="d-flex">
          <div className="card me-3" style={{ minWidth: "120px" }}>
            <div className="card-body">
              <h5 className="card-title">Strategy 1</h5>
              <p className="card-text">P-100</p>
              <p className="card-text">L-100</p>
              <p className="card-text">
                <small className="text-muted">Total Order:2000</small>
              </p>
            </div>
          </div>

          <div className="card" style={{ minWidth: "120px" }}>
            <div className="card-body">
              <h5 className="card-title">Strategy 2</h5>
              <p className="card-text">P-100</p>
              <p className="card-text">L-100</p>
              <p className="card-text">
                <small className="text-muted">Total Order:2000</small>
              </p>
            </div>
          </div>
        </div>

        <BrokerStratRow />
      </div>
    </div>
  );
};

export default Dashboard;
