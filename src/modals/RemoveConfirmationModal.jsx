// RemoveConfirmationModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RemoveConfirmationModal = ({ showModal, handleClose, userIdToRemove, setUserIdToRemove, handleRemoveConfirmation }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Algorithm/Subscription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove the subscription for the following user?
        <input
          type="text"
          className="form-control my-3"
          placeholder="Enter User ID"
          value={userIdToRemove}
          onChange={(e) => setUserIdToRemove(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="danger" onClick={handleRemoveConfirmation}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveConfirmationModal;
