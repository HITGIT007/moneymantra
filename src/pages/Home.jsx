import React from "react";
import Login from "../components/Login";
import NavigationBar from "../components/NavigationBar";

function Home() {
  return (
    <>
      <NavigationBar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "89vh" }}
      >
        <div>
          <Login />
        </div>
      </div>
    </>
  );
}

export default Home;
