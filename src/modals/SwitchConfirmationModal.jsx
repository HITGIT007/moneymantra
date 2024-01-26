// SwitchConfirmationModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SwitchConfirmationModal = ({
  showModal,
  onClose,
  algorithmName,
  isSwitchedOn,
  onConfirm
}) => {
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Switch</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {`Are you sure you want to ${isSwitchedOn ? 'turn off' : 'turn on'} "${algorithmName}"?`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SwitchConfirmationModal;
