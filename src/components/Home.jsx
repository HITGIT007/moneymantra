import Nav from "./Nav";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Badge, InputGroup, Form } from "react-bootstrap";
import "../css/App.css";
import axios from "axios";
import BrokerStratRow from "../atoms/BrokerStratRow";
import Strategies from "../atoms/Strategies";
import {
  fetchSubscriptionsByStrategies,
  fetchOrderSummaries,
  fetchAlgorithms,
  fetchAdminOrderSummaries,
  getOrderDetails,
} from "../services/api";
import DateRangeModal from "../modals/DateRangeModal";
import OrdersTable from "../atoms/OrderDetails";
import OrderDetails from "../atoms/OrderDetails";
import OrderDetailsModal from "../modals/OrderDetailsModal";
function Home({ toggleSidebar, isSidebarVisible }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [adminUserOrderSummary, setAdminUserOrderSummary] = useState([]);
  const [customerId, setCustomerId] = useState("-1");
  const [endDate, setEndDate] = useState("");
  const [algorithms, setAlgorithms] = useState([]);
  const [orderSummaries, setOrderSummaries] = useState([]); // State to hold order summaries
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [orderDetail, setOrderDetail] = useState(null);
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const userType = sessionStorage.getItem("userType");
  const name = sessionStorage.getItem("name");
  const toggleOrderDetailsModal = () =>
    setShowOrderDetailsModal(!showOrderDetailsModal);

  const handleOrderClick = async () => {
    try {
      const response = await getOrderDetails({
        userId,
        customerId,
        startTime: startDate,
        endTime: endDate,
      });

      console.log("Order Details:", response);
      if (response.httpStatusCode === "200") {
        setOrderDetail(response.orderDetails);
      }
    } catch (error) {
      console.error("Error fetching order summaries:", error);
    }
    setShowOrderDetailsModal(true);
  };
  const getThirtyDaysBeforeDate = () => {
    const today = new Date();
    const pastDate = new Date(today.setDate(today.getDate() - 30));
    return pastDate.toISOString();
  };
  const [startDate, setStartDate] = useState(getThirtyDaysBeforeDate());

  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    const token = sessionStorage.getItem("token");
    const initFetch = async () => {
      try {
        if (userType === "2" && token) {
          console.log("Init Fetching...", userType, token);
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
        if (userType === "1" && token) {
          const algorithmsData = await fetchAlgorithms(userId, token);
          setAlgorithms(algorithmsData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (userType && token) {
      initFetch();
    }
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

  function sortOrderSummaries(orderSummaries) {
    // Convert the order summaries object into an array of [key, value] pairs
    const entries = Object.entries(orderSummaries);

    // Sort the entries based on the tradingStrategy
    const sortedEntries = entries.sort((a, b) => {
      const strategyA = a[1].tradingStrategy.toUpperCase(); // Ignore upper and lowercase
      const strategyB = b[1].tradingStrategy.toUpperCase(); // Ignore upper and lowercase
      return strategyA.localeCompare(strategyB);
    });

    // Convert the sorted array back into an object
    const sortedOrderSummaries = {};
    for (const [key, value] of sortedEntries) {
      sortedOrderSummaries[key] = value;
    }

    return sortedOrderSummaries;
  }
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

      setAdminUserOrderSummary(
        sortOrderSummaries(orderSummaries?.orderSummaries)
      );
    } catch (error) {
      // Handle errors if necessary
      console.error("Error fetching order summaries:", error);
    }
  };
  // Inside your component, where you want to display the total P/L
  const totalPL = calculateTotalPL(
    userType === "2" ? orderSummaries : adminUserOrderSummary
  );

  useEffect(() => {}, []);
  return (
    <>
      <div className="sticky-top">
        <Nav
          name={name}
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
        <div className="d-flex align-items-center justify-content-between plain-background text-white px-3 py-3">
          <div>
            {userType === "1" && (
              <InputGroup className="mb-3">
                <Button
                  variant="outline-info"
                  id="button-addon2"
                  onClick={handleOrderClick}
                >
                  ORDER DETAILS
                </Button>
                <Form.Control
                  style={{ width: "120px" }}
                  placeholder="Enter UserID"
                  aria-label="Enter UserID"
                  aria-describedby="basic-addon2"
                  value={customerId}
                  onChange={handleInputChange}
                />
                <Button
                  variant="outline-primary"
                  id="button-addon2"
                  onClick={handleButtonClick}
                >
                  ORDER SUMMARY
                </Button>
              </InputGroup>
            )}
          </div>

          <div className=" flex justify-align-center d-flex align-items-center">
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
          </div>
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
      </div>
      <div className="pb-4">
        {console.log("Test Infinite")}
        <div className="container-fluid mt-2">
          <DateRangeModal
            showModal={showModal}
            handleFilterToggle={handleFilterToggle}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />

          {/* {orderDetail !== null && <OrderDetails orders={orderDetail}/>} */}

          <Strategies
            orderSummaries={
              userType === "2" ? orderSummaries : adminUserOrderSummary
            }
          />

          <BrokerStratRow
            algorithms={algorithms}
            subscriptions={subscriptions}
          />
        </div>

        <OrderDetailsModal
          show={showOrderDetailsModal}
          onHide={toggleOrderDetailsModal}
          orderDetail={orderDetail}
        />
      </div>
    </>
  );
}

export default Home;
