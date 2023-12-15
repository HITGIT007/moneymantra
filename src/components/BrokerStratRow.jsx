import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap"; // Ensure you've installed 'react-bootstrap'
import '../css/App.css'

const BrokerStratRow = () => {
  const [showModal, setShowModal] = useState(false);
  const [switchState, setSwitchState] = useState({}); // State to track switch for each broker
  const [orderSwitch, setOrderSwitch] = useState({})


  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);


  
  // Handle switch toggle
  const handleSwitchChange = (id) => {
    setSwitchState(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleOrderChange = (id) => {
    setOrderSwitch(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  // Placeholder for your actual broker data
  const brokers = [
    { id: 1, name: "Strategy 1" },
    { id: 2, name: "Strategy 2" },
  ];
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
      <h3>STRATEGIES</h3>
      <button className="btn btn-outline-light d-flex align-items-center">
            Create New <i className="bi bi-plus-lg ms-2"></i>
          </button>
          </div>
      {brokers.map((broker) => (
        <div
          key={broker.id}
          className="row align-items-center my-2 border rounded "
        >
          <div className="col-auto d-flex py-2 align-items-center">
          <div className="col-auto d-flex py-2 align-items-center">
            {renderSwitch(broker)}
            <span 
            style={{width:"40px"}}
            className={`ms-2 label bg-light border rounded text-center ${switchState[broker.id] ? 'text-success' : 'text-danger'}`}>
              {switchState[broker.id] ? 'On' : 'Off'}
            </span>
          </div>
            <label htmlFor={`toggle-${broker.id}`} className="card ms-2">
              <div className="card-body">{broker.name}
              <div className="d-flex align-items-center justify-content-center border border-warning rounded p-0">
                Order
              <input 
                className="form-check-input ms-2" 
                type="checkbox" 
                role="switch" 
                id={`flexOrderCheck-${broker.id}`}
                checked={orderSwitch[broker.id]} 
                onChange={() => handleOrderChange(broker.id)} 
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
