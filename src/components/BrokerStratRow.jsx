import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap"; // Ensure you've installed 'react-bootstrap'
import "../css/App.css";

const BrokerStratRow = ({ algorithms }) => {
  const [showModal, setShowModal] = useState(false);
  const [switchState, setSwitchState] = useState({}); // State to track switch for each broker
  const [orderSwitch, setOrderSwitch] = useState({});
  const [userIdToRemove, setUserIdToRemove] = useState("");
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const handleRemoveConfirmation = () => {
    // Add logic to remove subscription for the user
    console.log(`Removing subscription for user ID: ${userIdToRemove}`);
    // Close the modal after action
    setShowModal(false);
  };
  // Handle switch toggle
  const handleSwitchChange = (id) => {
    setSwitchState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleOrderChange = (id) => {
    setOrderSwitch((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  // Placeholder for your actual broker data

  const renderSwitch = (broker) => (
    <label className="switch">
      <input
        type="checkbox"
        checked={switchState[broker.id]}
        onChange={() => handleSwitchChange(broker.id)}
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
      {algorithms.map((algorithm) => (
        <div
          key={algorithm.name}
          className="row align-items-center my-2 border rounded "
        >
          <div className="col-auto d-flex py-2 align-items-center">
            <div className="col-auto d-flex py-2 align-items-center">
              {renderSwitch(algorithm)}
              <span
                style={{ width: "40px" }}
                className={`ms-2 label bg-light border rounded text-center ${
                  switchState[algorithm.id] ? "text-success" : "text-danger"
                }`}
              >
                {switchState[algorithm.id] ? "On" : "Off"}
              </span>
            </div>
            <label htmlFor={`toggle-${algorithm.id}`} className="card ms-2">
              <div className="d-flex align-items-center p-2">
                {algorithm.name}
                <div className="d-flex align-items-center justify-content-center border border-warning rounded p-0 ms-2 px-1">
                  Order
                  <input
                    className="form-check-input ms-2"
                    type="checkbox"
                    role="switch"
                    id={`flexOrderCheck-${algorithm.id}`}
                    checked={orderSwitch[algorithm.id]}
                    onChange={() => handleOrderChange(algorithm.id)}
                  />
                </div>
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
                    <Modal.Title>Remove Algorithm/Subscription</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to remove the subscription for the
                    following user?
                    <input
                      type="text"
                      className="form-control my-3"
                      placeholder="Enter User ID"
                      value={userIdToRemove}
                      onChange={(e) => setUserIdToRemove(e.target.value)}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                      No
                    </Button>
                    <Button variant="danger" onClick={handleRemoveConfirmation}>
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrokerStratRow;
