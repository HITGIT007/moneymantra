import Nav from "./Nav";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Badge, InputGroup, Form } from "react-bootstrap";
import "../css/App.css";
import axios from "axios";
import BrokerStratRow from "./BrokerStratRow";
import Strategies from "./Strategies";
import {
  fetchSubscriptionsByStrategies,
  fetchOrderSummaries,
  fetchAlgorithms,
  fetchAdminOrderSummaries,
} from "../services/api";
import DateRangeModal from "./DateRangeModal";
function Home({ toggleSidebar, isSidebarVisible }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [adminUserOrderSummary, setAdminUserOrderSummary] = useState([]);
  const [customerId, setCustomerId] = useState("");
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
    const userType = sessionStorage.getItem("userType");
    const initFetch = async () => {
      
      console.log("Init Fetching...");
      try {
        if (userType === "2") {
          const subscriptionsData = await fetchSubscriptionsByStrategies(
            userId,
            token
          );
          console.log(
            "fetchSubscriptionsByStrategies======>",
            subscriptionsData.userAlgorithmSubscriptionDTOs
          );
          setSubscriptions(subscriptionsData?.userAlgorithmSubscriptionDTOs);
          const orderSummariesData = await fetchOrderSummaries(
            userId,
            startDate,
            currentTime,
            token
          );
          setOrderSummaries(orderSummariesData.orderSummaries);
        }

        console.log("userType =======>", userType);
        if (userType === "1") {
          const algorithmsData = await fetchAlgorithms(userId, token);
          setAlgorithms(algorithmsData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    initFetch();
  }, [userId, userType, token]);

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
    return Object.values(orderSummaries).reduce(
      (total, summary) => total + summary.profit,
      0
    );
  };
  const handleInputChange = (e) => {
    setCustomerId(e.target.value);
  };
  const handleButtonClick = async () => {
    try {
      // Call the API function with the customerId and other parameters
      const orderSummaries = await fetchAdminOrderSummaries(
        userId,
        customerId,
        startDate,
        currentTime
      );

      // Handle the orderSummaries as needed
      console.log("Order Summaries:", orderSummaries);
      setAdminUserOrderSummary(orderSummaries?.orderSummaries);
    } catch (error) {
      // Handle errors if necessary
      console.error("Error fetching order summaries:", error);
    }
  };
  // Inside your component, where you want to display the total P/L
  const totalPL = calculateTotalPL(
    userType === "2" ? orderSummaries : adminUserOrderSummary
  );
  return (
    <div className="pb-4">
      <Nav
        name={name}
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      />
      {console.log("Test Infinite")}
      <div className="container-fluid">
        <DateRangeModal
          showModal={showModal}
          handleFilterToggle={handleFilterToggle}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        <div className="d-flex align-items-center justify-content-between  mb-2">
          <div>
            {userType === "1" && (
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter UserID"
                  aria-label="Enter UserID"
                  aria-describedby="basic-addon2"
                  value={customerId}
                  onChange={handleInputChange}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={handleButtonClick}
                >
                  SUBS
                </Button>
              </InputGroup>
            )}
          </div>
          {(userType === "2" || adminUserOrderSummary.length > 1) &&
          <div className="d-flex align-items-center">
             <div className="mx-2 h4 text-center text-white">TOTAL P/L : </div>
           
            {totalPL < 0 ? (
              <Badge bg="danger mx-2 h4">
                <h3>{totalPL.toFixed(2)}</h3>
              </Badge>
            ) : (
              <Badge bg="success mx-2 h4">
                <h3>{totalPL.toFixed(2)}</h3>
              </Badge>
            )}
          </div>}
          <div className="d-flex align-items-center">
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
            </div>
            <div
              className="btn btn-outline-light d-flex"
              onClick={handleFilterToggle}
            >
              <i class="bi bi-filter-right"></i>
              <i class="bi bi-filter-left"></i>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center mb-3 justify-content-between w-100">
         
            <Strategies
              orderSummaries={
                userType === "2" ? orderSummaries : adminUserOrderSummary
              }
            />
          
        </div>

        <BrokerStratRow algorithms={algorithms} subscriptions={subscriptions} />
      </div>
    </div>
  );
}

export default Home;
