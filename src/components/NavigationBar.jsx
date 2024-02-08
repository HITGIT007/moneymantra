// NavigationBar.js
import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
import LoginModal from "./LoginModal"; // Import the new LoginModal component

const NavigationBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  return (
    <>
      <Navbar className="sticky-top plain-background" variant="dark" expand="lg">
        <Navbar.Brand
          href="/"
          style={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          <img
            src={require("../assets/images/mmremovebg.png")}
            alt="logo"
            width={60}
            height={60}
          />
          {" Moneymantra AI"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#dashboard">Dashboard</Nav.Link> */}
            {/* <Nav.Link href="#algo">Algo</Nav.Link> */}
            <Nav.Link href="#strategy">Strategy</Nav.Link>
            <Nav.Link href="#marketplace">Marketplace</Nav.Link>
            <Nav.Link href="#community">Community</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
          <Button onClick={handleShowLoginModal} variant="outline-info" className="me-2 loginbtn">
            Login
          </Button>
          <Button href="/signup" className="me-3" variant="info">
            Signup
          </Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Render the LoginModal component */}
      <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
    </>
  );
};

export default NavigationBar;
