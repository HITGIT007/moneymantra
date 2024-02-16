import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import LoginModal from "./LoginModal";
import "../css/App.css"; // Reusing the same CSS for consistency

const NavigationBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  return (
    <>
      <Navbar
        className=" plain-background"
        // variant="dark"
        expand="lg"
        style={{ backgroundColor: "transparent" }}
      >
        <Navbar.Brand
          href="/"
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}
        >
          <img
            src={require("../assets/images/mmremovebg.png")}
            alt="logo"
            width={50}
            height={50}
          />
          {" Moneymantra AI"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#strategy" style={{ color: "#fff" }}>
              Strategy
            </Nav.Link>
            <Nav.Link href="#marketplace" style={{ color: "#fff" }}>
              Marketplace
            </Nav.Link>
            <Nav.Link href="contact" style={{ color: "#fff" }}>
              Contact
            </Nav.Link>
            <Nav.Link href="#about" style={{ color: "#fff" }}>
              About
            </Nav.Link>
          </Nav>
          {/* <Button
            onClick={handleShowLoginModal}
            variant="outline-info"
            className="me-2 loginbtn"
            style={{ color: "#fff" }}
          >
            Login
          </Button> */}
          <Button
            href="/signup"
            className="me-3"
            variant="outline-info"
            style={{ color: "#fff" }}
          >
            Signup
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
    </>
  );
};

export default NavigationBar;
