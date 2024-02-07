// OrderDetailsModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";
import OrderDetails from "../atoms/OrderDetails"; // Make sure the path is correct

const OrderDetailsModal = ({ show, onHide, orderDetail }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      fullscreen={true}
      style={{ backgroundColor: '#230B28' }}
    >
      <Modal.Header closeButton style={{ backgroundColor: '#230B28' }}>
        <Modal.Title id="contained-modal-title-vcenter" className="text-white">
          Order Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#230B28' }}>
        {orderDetail && <OrderDetails orders={orderDetail} />}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#230B28' }}>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;
