import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "../css/App.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import BrokerStratRow from "../components/BrokerStratRow";
import Strategies from "../components/Strategies";
import Home from "../components/Home";
const Dashboard = () => {
  
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="container-fluid gradient_background_dashboard_withoutheight min-vh-100">
      <div className="row">
        
          {isSidebarVisible && <div className="col-4 col-md-2 bg-white vh-100 position-fixed"> <Sidebar/></div>}
       
        {isSidebarVisible && <div className="col-4 col-md-2"> </div>}
        <div className="col">
            <Home toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}/>
        </div>
      </div>
      {/* Sidebar */}
     

   
      
    </div>
  );
};

export default Dashboard;
