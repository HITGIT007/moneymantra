import React, { useState, useEffect } from 'react';
import '../css/SignUp.css';
import Sidebar from './Sidebar';
const Dashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    // Toggles the visibility of the sidebar
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="gradient_background_dashboard">
            {/* Sidebar */}
            <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />
            {/* Header section */}
            <nav className="navbar_dashboard navbar-expand-lg navbar-dark bg-primary p-3">
                <div className="container-fluid">
                     {/* Toggle button for the sidebar */}
                     <button onClick={toggleSidebar} className="btn btn-primary m-2">
                        <i className={`bi ${isSidebarVisible ? 'bi-x-lg' : 'bi-list'}`}></i>
                    </button>
                    <div className="navbar-brand d-flex align-items-center">
                        <span className="h2 mb-0 text-white">PP</span>
                        <span className="h4 mb-0 text-white px-3">WELCOMEPRATEEK PRIYADARSHI</span>
                    </div>
                    <div className="ms-auto d-flex align-items-center">
                        <div className="text-white d-flex align-items-center me-3">
                            <span className="mx-2 h4">TOTAL PNL 0/-</span>
                            <span className="mx-2 h4">|</span>
                            <span className="mx-2 h4">TOTAL ORDER 0</span>
                            <span className="mx-2 h4">|</span>
                            <span className="mx-2 h4">Total Strategies: 2</span>
                        </div>
                        <button className="btn btn-outline-light d-flex align-items-center">
                            Create New <i className="bi bi-plus-lg ms-2"></i>
                        </button>
                        <div className="text-white ms-3 d-flex align-items-center">
                            <span className="h4 mb-0">{currentTime.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </nav>
            
            {/* Main content section */}
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Strategy 1</h5>
                                <p className="card-text">Profit</p>
                                <p className="card-text"><small className="text-muted">Total Order:2000</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Strategy 2</h5>
                                <p className="card-text">Loss</p>
                                <p className="card-text"><small className="text-muted">Total Order:2000</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
};

export default Dashboard;
