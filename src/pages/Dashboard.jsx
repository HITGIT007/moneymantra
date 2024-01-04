import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "../css/App.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import BrokerStratRow from "../components/BrokerStratRow";
import Strategies from "../components/Strategies";
const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [algorithms, setAlgorithms] = useState([]);
  const userId = 1;
  useEffect(() => {
    const fetchAlgorithms = async () => {
      try {
        // Retrieve the token from sessionStorage
        const token = sessionStorage.getItem("token");
        console.log("token=======>", token);
        // Check if the token is available
        if (!token) {
          console.error("No token found in sessionStorage");
          // Handle the case where the token isn't available
          return;
        }

        // Add the token to the Authorization header
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Construct the endpoint with the userId as a query parameter
        const endpoint = `https:///moneymantraai.com/api/admin/get-algorithm-by-strategies?userId=${userId}`;
        
        // Make the GET request
        const response = await axios.get(endpoint, config);
        
        // Set the algorithms data to state
        setAlgorithms(response.data);
      } catch (error) {
        console.error("Error fetching algorithms:", error);
        // Handle error response
      }
    };

    fetchAlgorithms();
  }, []); // Empty dependency array to avoid re-runs
  useLayoutEffect(() => {
    // Check for 'logged' in session storage
    const isLogged = sessionStorage.getItem("logged");

    // If 'logged' is not 'true', redirect to the login page
    if (isLogged !== "true") {
      navigate("/login");
    }
  }, [navigate]); // Dependency array includes navigate to avoid re-running the effect unnecessarily

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Toggles the visibility of the sidebar
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const handleFilterToggle = () => setShowModal(!showModal);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  // Custom function to format the date and time
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
    <div className="d-flex gradient_background_dashboard">
      {/* Sidebar */}
      <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />

      {/* Main content section */}
      <div className="container-fluid">
        <nav className="navbar_dashboard navbar-expand-lg navbar-dark d-flex align-items-center justify-content-between">
          {/* Toggle button for the sidebar */}
          <div className="d-flex align-items-center">
            <button
              onClick={toggleSidebar}
              className="btn btn-primary m-2 border border-danger"
            >
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
          <div
            className="text-white ms-3 d-flex align-items-center border border-2 rounded my-2 py-2 text-center"
            style={{ width: "150px" }}
          >
            <span className="h4 mb-0">{formatDate(currentTime)}</span>
          </div>
        </nav>
        <div className="d-flex align-items-center border rounded p-4 mb-3 justify-content-between">
          <div className="text-white d-flex align-items-center me-3">
            <span className="mx-2 h4">TOTAL P/L - 0</span>
            <span className="mx-1 h4">|</span>
            <Strategies pnl={true} order={false} />
          </div>

          <div
            className="d-flex align-items-center justify-content-between mt-2"
            style={{ height: "50px" }}
          >
            {/* Date display */}
            {startDate && endDate && (
              <div className="text-dark d-flex flex-column">
                <span className="mx-2 bg-white rounded mb-1 px-1">
                  {startDate}
                </span>
                <span className="mx-2 bg-white rounded px-1">{endDate}</span>
              </div>
            )}

            {/* Spacer to push the button to the end */}
            <div className="flex-grow-1"></div>

            {/* Filter button */}
            <Button
              className="btn btn-outline-light"
              onClick={handleFilterToggle}
            >
              Filter
            </Button>
          </div>
        </div>
        <div className="d-flex align-items-center border rounded p-4 mb-3">
          <div className="text-white d-flex align-items-center me-3">
            <span className="mx-2 h4">TOTAL ORDER - 0</span>
            <span className="mx-1 h4">|</span>
            <Strategies pnl={false} order={true} />
          </div>
        </div>

        <BrokerStratRow />
      </div>
      {/* Filter Modal */}
      <Modal show={showModal} onHide={handleFilterToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Select Date Range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              handleFilterToggle();
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleFilterToggle}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
