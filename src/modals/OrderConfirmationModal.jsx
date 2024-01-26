import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const OrderConfirmationModal = ({ showModal, handleClose, confirmSubscription, handleConfirm }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Confirm Order Change</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to {confirmSubscription?.isRealOrderAllowedByAdmin ? 'stop' : 'enable'} orders for {confirmSubscription?.algoName}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderConfirmationModal;
