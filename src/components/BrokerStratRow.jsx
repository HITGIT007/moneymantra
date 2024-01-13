import React, { useEffect, useState } from "react";
import { Button, Modal, Badge } from "react-bootstrap"; // Ensure you've installed 'react-bootstrap'
import "../css/App.css";
import {
  stopNewOrdersByAlgorithm,
  stopNewOrdersBySubscription,
} from "../services/api"; // Import the API function
const BrokerStratRow = ({ algorithms, orderSummaries, subscriptions }) => {
  const [showModal, setShowModal] = useState(false);
  const [switchState, setSwitchState] = useState({}); // State to track switch for each broker
  const [orderSwitch, setOrderSwitch] = useState({});
  const [userIdToRemove, setUserIdToRemove] = useState("");
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const userId = sessionStorage.getItem("userId");
  const userType = sessionStorage.getItem("userType");
  console.log(
    "subscriptions================================================>",
    subscriptions
  );
  const groupAlgorithmsByStrategy = (algorithms) => {
    return algorithms.reduce((acc, algorithm) => {
      // Use the tradingStrategy as the key
      const key = algorithm.tradingStrategy;

      // If the key doesn't exist in the accumulator, initialize it with an empty array
      if (!acc[key]) {
        acc[key] = [];
      }

      // Push the current algorithm to the array associated with the key
      acc[key].push(algorithm);

      return acc;
    }, {});
  };
  const groupOrdersByStrategy = (subscriptions) => {
    return subscriptions.reduce((acc, subscriptions) => {
      // Use the tradingStrategy as the key
      const key = subscriptions.tradingStrategy;

      // If the key doesn't exist in the accumulator, initialize it with an empty array
      if (!acc[key]) {
        acc[key] = [];
      }

      // Push the current subscriptions to the array associated with the key
      acc[key].push(subscriptions);

      return acc;
    }, {});
  };

  const handleRemoveConfirmation = () => {
    // Add logic to remove subscription for the user
    console.log(`Removing subscription for user ID: ${userIdToRemove}`);
    // Close the modal after action
    setShowModal(false);
  };
  // Handle switch toggle
  const handleSwitchChange = async (algorithm) => {
    const newState = !switchState[algorithm.id];
    console.log("newState=====>", newState);
    setSwitchState((prevState) => ({
      ...prevState,
      [algorithm.id]: newState,
    }));

    console.log("algorithm.id =====>", algorithm);
    try {
      const response = await stopNewOrdersByAlgorithm(
        userId, // Assuming you have a userId for each algorithm
        algorithm,
        newState, // true or false based on the new state of the switch
        "someType" // Replace with the actual type if needed
      );
      console.log("API response:", response);
      // Further actions based on response
    } catch (error) {
      console.error("Error in stopping new orders by algorithm:", error);
      // Handle error
    }
  };

  const handleOrderChange = async (subscription) => {
    // Get the current state for the particular subscription
    const currentState = orderSwitch[subscription.id];
    const newState = !currentState;

    // Update the state with the new value
    setOrderSwitch((prevState) => ({
      ...prevState,
      [subscription.id]: newState,
    }));

    // Now, make the API call with the new state
    try {
      const response = await stopNewOrdersBySubscription(
        userId,
        subscription.id, // Use the id from the subscription object
        newState,
        "someType"
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error stopping orders by subscription:", error);
    }
  };

  // Placeholder for your actual broker data

  const renderSwitch = (algorithm) => (
    <label className="switch">
      {console.log("renderSwitch======>", algorithm)}
      <input
        type="checkbox"
        checked={switchState[algorithm.id]}
        onChange={() => handleSwitchChange(algorithm.id)}
      />
      <span className="slider round"></span>
    </label>
  );
  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="text-light">STRATEGIES</h3>
        <button className="btn btn-outline-light d-flex align-items-center">
          Create New <i className="bi bi-plus-lg ms-2"></i>
        </button>
      </div>

      {userType === "1" &&
        Object.entries(groupAlgorithmsByStrategy(algorithms)).map(
          ([strategyName, strategyAlgorithms]) => (
            <React.Fragment key={strategyName}>
              <Badge bg="warning" text="dark">
                {" "}
                <h3>{strategyName}</h3>
              </Badge>
              {/* <h3 className="text-light">{strategyName}</h3> */}
              {strategyAlgorithms.map((algorithm, index) => (
                <div
                  key={algorithm.name + index}
                  className="row align-items-center my-2 border rounded "
                >
                  <div className="col-auto d-flex py-2 align-items-center">
                    <div className="col-auto d-flex py-2 align-items-center">
                      {renderSwitch(algorithm)}
                      <span
                        style={{ width: "40px" }}
                        className={`ms-2 label bg-light border rounded text-center ${
                          switchState[algorithm.id]
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {switchState[algorithm.id] ? "On" : "Off"}
                      </span>
                    </div>
                    <label
                      htmlFor={`toggle-${algorithm.id}`}
                      className="card ms-2"
                    >
                      <div className="d-flex align-items-center p-2">
                        {algorithm.name}
                      </div>
                    </label>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button
                          variant="link"
                          onClick={handleModalShow}
                          style={{ color: "white" }}
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </Button>

                        <Modal show={showModal} onHide={handleModalClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Remove Algorithm/Subscription
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to remove the subscription for
                            the following user?
                            <input
                              type="text"
                              className="form-control my-3"
                              placeholder="Enter User ID"
                              value={userIdToRemove}
                              onChange={(e) =>
                                setUserIdToRemove(e.target.value)
                              }
                            />
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleModalClose}
                            >
                              No
                            </Button>
                            <Button
                              variant="danger"
                              onClick={handleRemoveConfirmation}
                            >
                              Yes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )
        )}

      {userType === "2" &&
        Object.entries(groupOrdersByStrategy(subscriptions)).map(
          ([strategyName, strategyAlgorithms]) => (
            <React.Fragment key={strategyName}>
              <Badge bg="warning" text="dark">
            
                <h3>{strategyName}</h3>
              </Badge>

              {strategyAlgorithms.map((subscription, index) => (
                <div
                  key={subscription.name + index}
                  className="row align-items-center my-2 border rounded "
                >
                  <div className="col-auto d-flex py-2 align-items-center">
                    <Button
                      variant="outline-danger"
                      className="ms-2"
                      onClick={() => handleOrderChange(subscription)} // Pass the entire subscription object
                    >
                      Order
                      <input
                        className="form-check-input ms-2"
                        type="checkbox"
                        role="switch"
                        id={`flexOrderCheck-${subscription.id}`}
                        checked={orderSwitch[subscription.id]} // Make sure this reflects the current state
                        onChange={() => handleOrderChange(subscription)} // Add this to handle checkbox changes
                      />
                    </Button>

                    <label
                      htmlFor={`toggle-${subscription.id}`}
                      className="card ms-2"
                    >
                      <div className="d-flex align-items-center p-2">
                        {subscription.algoName}
                      </div>
                    </label>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button
                          variant="link"
                          onClick={handleModalShow}
                          style={{ color: "white" }}
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </Button>

                        <Modal show={showModal} onHide={handleModalClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Remove Algorithm/Subscription
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to remove the subscription for
                            the following user?
                            <input
                              type="text"
                              className="form-control my-3"
                              placeholder="Enter User ID"
                              value={userIdToRemove}
                              onChange={(e) =>
                                setUserIdToRemove(e.target.value)
                              }
                            />
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleModalClose}
                            >
                              No
                            </Button>
                            <Button
                              variant="danger"
                              onClick={handleRemoveConfirmation}
                            >
                              Yes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )
        )}
    </div>
  );
};

export default React.memo(BrokerStratRow);
