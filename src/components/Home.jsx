import Nav from "./Nav";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "../css/App.css";
import axios from "axios";
import BrokerStratRow from "./BrokerStratRow";
import Strategies from "./Strategies";
import {
  fetchSubscriptionsByStrategies,
  fetchOrderSummaries,
  fetchAlgorithms,
} from "../services/api";
function Home({ toggleSidebar, isSidebarVisible }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [adminalgorithms, setadminAlgorithms] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [algorithms, setAlgorithms] = useState([]);
  const [orderSummaries, setOrderSummaries] = useState([]); // State to hold order summaries
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const userType = sessionStorage.getItem("userType");
  const name = sessionStorage.getItem("name");

  const getThirtyDaysBeforeDate = () => {
    const today = new Date();
    const pastDate = new Date(today.setDate(today.getDate() - 30));
    return pastDate.toISOString();
  };
  const [startDate, setStartDate] = useState(getThirtyDaysBeforeDate());

  useEffect(() => {
    const initFetch = async () => {
      try {
        if( userType === "2"){
          const subscriptionsData = await fetchSubscriptionsByStrategies(
            userId,
            token
          );
          console.log("fetchSubscriptionsByStrategies======>",subscriptionsData.userAlgorithmSubscriptionDTOs)
          setSubscriptions(subscriptionsData?.userAlgorithmSubscriptionDTOs);
          const orderSummariesData = await fetchOrderSummaries(
            userId,
            startDate,
            currentTime,
            token
          );
          setOrderSummaries(orderSummariesData.orderSummaries);
         
        }
       
       
        
        console.log("userType =======>",userType)
        if( userType === "1"){
          const algorithmsData = await fetchAlgorithms(userId, token);
          setAlgorithms(algorithmsData);
        }
    
      } catch (error) {
        console.error(error);
      }
    };

    initFetch();
  }, [userId, token, startDate, userType]);

  useEffect(() => {
    console.log(
      "algorithms================================================>",
      algorithms
    );
  }, [algorithms]);

  useLayoutEffect(() => {
    setCurrentTime(new Date());
    // Check for 'logged' in session storage
    const isLogged = sessionStorage.getItem("logged");

    // If 'logged' is not 'true', redirect to the login page
    if (isLogged !== "true") {
      navigate("/login");
    }
  }, [navigate]); // Dependency array includes navigate to avoid re-running the effect unnecessarily

  // Toggles the visibility of the sidebar

  const handleFilterToggle = () => setShowModal(!showModal);

  const calculateTotalPL = (orderSummaries) => {
    return Object.values(orderSummaries).reduce((total, summary) => total + summary.profit, 0);
  };
  
  // Inside your component, where you want to display the total P/L
  const totalPL = calculateTotalPL(orderSummaries);
  return (
    <div>
      <Nav
        name={name}
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      />
      {console.log("Test Infinite")}
      <div className="container-fluid">
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
        {/* <nav className="navbar_dashboard navbar-expand-lg navbar-dark d-flex align-items-center justify-content-between">
       
          <div className="d-flex align-items-center">
            <button
              onClick={toggleSidebar}
              className="btn btn-primary m-2 border border-danger"
            >
              <i
                className={`bi ${isSidebarVisible ? "bi-x-lg" : "bi-list"}`}
              ></i>
            </button>
           
          </div>
          
        </nav> */}
        <div className="d-flex align-items-center border rounded p-4 mb-3 justify-content-between">
          <div className="text-white d-flex align-items-center me-3">
            <div>
            <div className="mx-2 h4">TOTAL P/L - {totalPL.toFixed(2)}</div>
            <div className="mx-2 h4">TOTAL ORDER - 0</div>
            </div>
            <span className="mx-1 h4">|</span>
            <Strategies orderSummaries={orderSummaries}  />
          </div>

          <div
            className="d-flex align-items-center justify-content-between mt-2"
            style={{ height: "50px" }}
          >
            {startDate && endDate && (
              <div className="text-dark d-flex flex-column">
                <span className="mx-2 bg-white rounded mb-1 px-1">
                  {startDate}
                </span>
                <span className="mx-2 bg-white rounded px-1">{endDate}</span>
              </div>
            )}

            <div className="flex-grow-1"></div>

            <Button
              className="btn btn-outline-light"
              onClick={handleFilterToggle}
            >
              Filter
            </Button>
          </div>
        </div>
        {/* <div className="d-flex align-items-center border rounded p-4 mb-3">
          <div className="text-white d-flex align-items-center me-3">
            <span className="mx-2 h4">TOTAL ORDER - 0</span>
            <span className="mx-1 h4">|</span>
        
            <Strategies orderSummaries={orderSummaries}  />
          </div>
        </div> */}

        <BrokerStratRow algorithms={algorithms} subscriptions={subscriptions}/>
      </div>
    </div>
  );
}

export default Home;
