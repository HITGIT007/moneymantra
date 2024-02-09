import React, { useEffect, useState } from "react";
import { Button, Modal, Badge } from "react-bootstrap"; // Ensure you've installed 'react-bootstrap'
import "../css/App.css";
import {
  stopNewOrdersByAlgorithm,
  stopNewOrdersBySubscription,
} from "../services/api"; // Import the API function
import OrderConfirmationModal from "../modals/OrderConfirmationModal";
import RemoveConfirmationModal from "../modals/RemoveConfirmationModal";
import SwitchConfirmationModal from "../modals/SwitchConfirmationModal";
const BrokerStratRow = ({ algorithms, orderSummaries, subscriptions }) => {
  const [showModal, setShowModal] = useState(false);
  const [switchState, setSwitchState] = useState({}); // State to track switch for each broker
  const [orderSwitch, setOrderSwitch] = useState({});
  const [userIdToRemove, setUserIdToRemove] = useState("");
  const [confirmSubscription, setConfirmSubscription] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const userId = sessionStorage.getItem("userId");
  const userType = sessionStorage.getItem("userType");
  console.log(
    "subscriptions================================================>",
    subscriptions
  );
  const [showSwitchConfirmationModal, setShowSwitchConfirmationModal] =
    useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const handleSwitchClick = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setShowSwitchConfirmationModal(true);
  };

  const handleSwitchConfirmationClose = () => {
    setShowSwitchConfirmationModal(false);
    setSelectedAlgorithm(null);
  };

  // This function will be called when the confirmation is made within the modal
  const handleSwitchConfirmation = async () => {
    if (!selectedAlgorithm) return; // Guard clause in case selectedAlgorithm is null

    // Calculate the new state for the switch
    const newState = !switchState[selectedAlgorithm.id];

    // Perform the API call using the selectedAlgorithm state
    try {
      const response = await stopNewOrdersByAlgorithm(
        userId,
        selectedAlgorithm.id,
        newState,
        "someType"
      );
      console.log("Response:", response);

      // If the API call is successful, then update the state to reflect the new switch position
      setSwitchState((prevState) => ({
        ...prevState,
        [selectedAlgorithm.id]: newState,
      }));

      // Close the confirmation modal
      handleSwitchConfirmationClose();
    } catch (error) {
      console.error("Error stopping orders by algorithm:", error);
    }
  };
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

  const handleOrderChange = (subscription) => {
    setConfirmSubscription(subscription);
    setShowConfirmationModal(true); // Assuming showModal is the state controlling the visibility of your confirmation modal
  };
  const handleCloseModal = () => {
    setShowConfirmationModal(false);
    setConfirmSubscription(null); // Reset the confirmSubscription state
  };
  // This function will be called when the confirmation is made within the modal
  const handleConfirmOrderChange = async () => {
    if (!confirmSubscription) return; // Guard clause in case confirmSubscription is null

    // Perform the API call using the confirmSubscription state
    try {
      const response = await stopNewOrdersBySubscription(
        userId,
        confirmSubscription.id,
        !orderSwitch[confirmSubscription.id],
        "someType"
      );
      console.log("Response:", response);

      // Close the confirmation modal
      handleCloseModal();

      // Update the orderSwitch state to reflect the change
      setOrderSwitch((prevState) => ({
        ...prevState,
        [confirmSubscription.id]: !prevState[confirmSubscription.id],
      }));
    } catch (error) {
      console.error("Error stopping orders by subscription:", error);
    }
  };

  // Placeholder for your actual broker data

  const renderSwitch = (algorithm) => {
    const isChecked = switchState.hasOwnProperty(algorithm.id)
      ? switchState[algorithm.id]
      : algorithm.allowRealOrder;
  
    console.log("renderSwitch======>", algorithm);
    return (
      <label className="switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleSwitchClick(algorithm)} // This will only open the modal
        />
        <span className="slider round"></span>
      </label>
    );
  };
  

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="text-light">STRATEGIES</h3>
        {userType === "1" ? (
          <button className="btn btn-outline-light d-flex align-items-center">
            Create New <i className="bi bi-plus-lg ms-2"></i>
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <SwitchConfirmationModal
        showModal={showSwitchConfirmationModal}
        onClose={handleSwitchConfirmationClose}
        algorithmName={selectedAlgorithm?.name}
        isSwitchedOn={switchState[selectedAlgorithm?.id]}
        onConfirm={handleSwitchConfirmation}
      />
      <OrderConfirmationModal
        showModal={showConfirmationModal}
        handleClose={handleCloseModal}
        confirmSubscription={confirmSubscription}
        handleConfirm={handleConfirmOrderChange}
      />
      {userType === "1" &&
        Object.entries(groupAlgorithmsByStrategy(algorithms)).map(
          ([strategyName, strategyAlgorithms]) => (
            <React.Fragment key={strategyName}>
              <Badge bg="warning" text="dark">
                <h3>{strategyName}</h3>
              </Badge>
              {/* <h3 className="text-light">{strategyName}</h3> */}
              <div className="my-2 border rounded border-light">
                {strategyAlgorithms.map((algorithm, index) => (
                  <div
                    key={algorithm.name + index}
                    className="row align-items-center my-2  "
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

                          <RemoveConfirmationModal
                            showModal={showModal}
                            handleClose={handleModalClose}
                            userIdToRemove={userIdToRemove}
                            setUserIdToRemove={setUserIdToRemove}
                            handleRemoveConfirmation={handleRemoveConfirmation}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="my-2 border rounded border-light">
                {strategyAlgorithms.map((subscription, index) => (
                  <div
                    key={subscription.name + index}
                    className="row align-items-center my-2 "
                  >
                    <div className="col-auto d-flex py-2 align-items-center">
                      <Button
                        variant={
                          subscription.isRealOrderAllowedByAdmin
                            ? "outline-danger"
                            : "secondary"
                        }
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
                        className={`card ms-2 ${
                          subscription.isRealOrderAllowedByAdmin
                            ? "bg-white"
                            : "bg-secondary"
                        }`}
                      >
                        <div className="d-flex align-items-center p-2">
                          {subscription.algoName}
                        </div>
                      </label>
                    </div>
                    <div className="col d-flex justify-content-end">
                      {/* Additional elements if any */}
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          )
        )}
    </div>
  );
};

export default React.memo(BrokerStratRow);
