import React, { useState } from "react";
// import { Navbar, Nav, Button } from "react-bootstrap";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
// import "../css/App.css"; // Reusing the same CSS for consistency

const NavigationBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  return (
    <>
      <div className=" w-full  flex justify-between py-2 ">
        <Link
          to={"/"}
          className="text-white uppercase text-3xl font-bold underline decoration-double relative z-10"
        >
          Moneymantra AI
        </Link>
        <div className="flex">
          <Link
            to={"/signup"}
            className="px-3 py-2 bg-yellow-500 hover:bg-yellow-400 hover:shadow-lg hover:shadow-stone-300 text-black font-semibold cursor-pointer relative z-10 no-underline"
          >
            SIGNUP
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
