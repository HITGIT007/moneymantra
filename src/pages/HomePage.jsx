import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import axios from "axios";
import "../css/App.css"; // Reusing the same CSS for consistency
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import homebg from "../assets/images/homeimage.png";
import rupeegold from "../assets/images/rupeegold.png"; // Import the image
import Login from "../components/Login";

const logoUrl = "../";

function HomePage() {
  return (
    <div>
      <NavigationBar />
      <div
        className="row"
        style={{
          height: "100vh",
          backgroundImage: `url(${homebg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="col-lg-6 p-5 d-flex flex-column justify-content-center">
          <h1 className="neon-text">Strategize Wealth, Maximize Growth.</h1>
          <p className="text-white">
            Money Mantra is a cutting-edge financial platform dedicated to
            empowering investors with smart, data-driven strategies for the
            stock market. At the heart of our mission lies a commitment to
            democratizing financial success through the use of advanced
            artificial intelligence. We provide both novice traders and seasoned
            investors with the tools they need to make informed decisions,
            minimize risk, and capitalize on growth opportunities. With Money
            Mantra, you gain a trusted partner in your financial journey,
            ensuring that every move you make is backed by expertise and
            precision, paving your path to financial prosperity.
          </p>
          <Link
            to="/signup"
            className="btn btn-info"
            style={{ width: "150px" }}
          >
            Sign Up for free!
          </Link>
        </div>
        <div className="col-lg-6 d-flex  flex-column align-items-center justify-content-center">
          <div className="login-box ">
            <Login />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      <div
        className="text-center text-lg-start bg-light text-muted "
        style={{
          backgroundColor: "pink",
        }}
      >
        <div
          className="text-center p-4 bg-black text-white"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Moneymantra AI. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default HomePage;
