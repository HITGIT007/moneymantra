import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";

const Dashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Start with the sidebar hidden on mobile
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="container-fluid plain-background min-vh-100">
      <div className="row">
        {/* Sidebar - visible on medium and larger screens */}
        {isSidebarVisible && (
          <div className="col-md-2 bg-white vh-100 position-fixed d-none d-md-block">
            <Sidebar />
          </div>
        )}

        {/* Main content */}
        <div className={isSidebarVisible ? "col-md-10 offset-md-2" : "col-12"}>
          <Home
            toggleSidebar={toggleSidebar}
            isSidebarVisible={isSidebarVisible}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
