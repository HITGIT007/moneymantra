// LoginModal.js
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import LoginPage from "./Login";

function LoginModal({ show, handleClose }) {
  return (
    <Modal className="text-white" show={show} onHide={handleClose}>
      <Modal.Header closeButton className="plain-background text-white">
        <Modal.Title className="text-center">LOGIN</Modal.Title>
      </Modal.Header>
      <Modal.Body className="plain-background">
        <LoginPage />
      </Modal.Body>
      {/* No footer or anything, as the login page should contain all necessary buttons */}
    </Modal>
  );
}

export default LoginModal;
