import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap"; // Ensure you've installed 'react-bootstrap'

const BrokerStratRow = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  // Placeholder for your actual broker data
  const brokers = [
    { id: 1, name: "Nift 1090" },
    { id: 2, name: "Nift 1090" },
  ];

  return (
    <div className="container-fluid">
      {brokers.map((broker) => (
        <div
          key={broker.id}
          className="row align-items-center my-2 border rounded "
        >
          <div className="col-auto d-flex py-2">
            <input
              type="checkbox"
              id={`toggle-${broker.id}`}
              className="toggle-button"
            />
            <label htmlFor={`toggle-${broker.id}`} className="card ms-2">
              <div className="card-body">{broker.name}</div>
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
                    <Modal.Title>Broker Options</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* Replace these with actual options */}
                    <p>Option 1</p>
                    <p>Option 2</p>
                    <p>Option 3</p>
                  </Modal.Body>
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
