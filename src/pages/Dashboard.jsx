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
  const [adminalgorithms, setadminAlgorithms] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [algorithms, setAlgorithms] = useState([]);
  const [orderSummaries, setOrderSummaries] = useState([]); // State to hold order summaries
  const [subscriptions, setSubscriptions] = useState([]);
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const name = sessionStorage.getItem("name");

  const getThirtyDaysBeforeDate = () => {
    const today = new Date();
    const pastDate = new Date(today.setDate(today.getDate() - 30));
    return pastDate.toISOString();
  };
  const [startDate, setStartDate] = useState(getThirtyDaysBeforeDate());

  useEffect(() => {
    const fetchSubscriptionsByStrategies = async () => {
      const requestBody = {
        userId: userId, // Replace with actual userId
        //tradingStrategies: ["1"], // Replace with actual strategy IDs
        //type: "string" // Replace with actual type if needed
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers like Authorization if needed
        }
      };

      try {
        const response = await axios.post(
          'https://moneymantraai.com/api/customer/get-subscriptions-by-strategies',
          requestBody,
          config
        );
        console.log("get-subscriptions-by-strategies========>",response.data)
        setSubscriptions(response.data); // Update state with the response data
      } catch (error) {
        console.error(error); // Handle the error
      }
    };

    fetchSubscriptionsByStrategies();
  }, []); // The empty dependency array ensures this effect runs once after the initial render




  useEffect(() => {
    console.log("token=======>", token);
    console.log("userId=======>", userId);
    const fetchOrderSummaries = async () => {
      if (!userId || !token) {
        console.error("User ID or token missing");
        return;
      }

      try {
        const response = await axios.post(
          "https://moneymantraai.com/api/customer/accounts/get-order-summaries",
          { userId, startTime: startDate, endTime: currentTime },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrderSummaries(response.data);
        console.log("Order Summaries:", response.data);
      } catch (error) {
        console.error("Error fetching order summaries:", error);
        // Handle error appropriately
      }
    };
    const fetchAlgorithms = async () => {
      try {
        if (!userId || !token) {
          console.error("User ID or token missing");
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const body = {
          userId: userId,
        };

        const endpoint = `https://moneymantraai.com/api/admin/get-algorithms-by-strategies`;

        const response = await axios.post(endpoint, body, config);
        setAlgorithms(response?.data?.algorithmDTOs);
      } catch (error) {
        console.error("Error fetching algorithms:", error);
      }
    };
    fetchOrderSummaries();
    fetchAlgorithms();
  }, [token, userId]);

  useEffect(() => {
    console.log(
      "algorithms================================================>",
      algorithms
    );
  }, [algorithms]);

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
       
              <span className="h4 mb-0 text-white px-3">
                WELCOME {name.toUpperCase()}
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
            <Strategies algorithms={algorithms} pnl={true} order={false} />
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
            <Strategies />
            <Strategies algorithms={algorithms} pnl={false} order={true} />
          </div>
        </div>

        <BrokerStratRow algorithms={algorithms} />
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
