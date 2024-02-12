import React from "react";
import { Modal, Button } from "react-bootstrap";

const DateRangeModal = ({
  showModal,
  handleFilterToggle,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={handleFilterToggle}
      // className="bg-dark" //Add class name here
    >
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
  );
};

export default DateRangeModal;
