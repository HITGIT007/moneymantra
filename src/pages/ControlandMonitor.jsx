import React, { useState, useLayoutEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css'; // Assuming the same CSS file for styling
import Sidebar from '../components/Sidebar';

function ControlandMonitor() {


  const navigate = useNavigate();

  useLayoutEffect(() => {
    // Check for 'logged' in session storage
    const isLogged = sessionStorage.getItem('logged');

    // If 'logged' is not 'true', redirect to the login page
    if (isLogged !== 'true') {
      navigate('/login');
    }
  }, [navigate]); // Dependency array includes navigate to avoid re-running the effect unnecessarily
  const [responseText, setResponseText] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const makeApiRequest = async (url, method = 'GET', body = null) => {
    try {
      const options = {
        method: method,
        url: url,
        headers: { 'Content-Type': 'application/json' },
        data: body,
      };
      const response = await axios(options);
      setResponseText(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error making API request:", error);
      setResponseText(error.toString());
    }
  };

  return (
    <div className="d-flex gradient_background" style={{
      height:"100vh"
    }}>
      <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar}/>
      <div className="container-fluid">
      <button onClick={toggleSidebar} className="btn btn-primary mt-4 ms-2 border border-danger">
          <i className={`bi ${isSidebarVisible ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>
      <div className="container p-5">

        <h1 style={{margin:0}} className="text-center mb-4">Control & Monitor</h1>
        <div className="button-container d-flex flex-wrap justify-content-center">
          <button className="btn btn-success m-2" onClick={() => makeApiRequest('https://moneymantraai.com/api/kite/login-and-authenticate')}>
            Authenticate Kite
          </button>
          <button className="btn btn-success m-2" onClick={() => makeApiRequest('https://moneymantraai.com/api/accounts/turn-on-web-socket', 'POST', { userName: 'manu3108', password: 'Manu@97531' })}>
            Turn On Web Socket
          </button>
          <button className="btn btn-success m-2" onClick={() => makeApiRequest('https://moneymantraai.com/api/feeds/get-last-tick')}>
            Get Last Tick
          </button>
          <button className="btn btn-success m-2" onClick={() => makeApiRequest('https://moneymantraai.com/api/accounts/orders/get-order-summary?instrumentToken=256265&nDays=500&tradingStrategy=1&userId=5')}>
            Get Order Summary
          </button>
          <button className="btn btn-success m-2" onClick={() => makeApiRequest('https://moneymantraai.com/api/accounts/active-peak-difference?instrumentToken=256265')}>
            Active Peak Difference
          </button>
          <button className="btn btn-success m-2" onClick={() => makeApiRequest('https://moneymantraai.com/api/accounts/active-five-ten-ema-algo1?instrumentToken=256265')}>
            Active Five Ten Ema Algo1
          </button>
          <button className="btn btn-success m-2" onClick={() => makeApiRequest('https://moneymantraai.com/api/accounts/get-wallet-detail?userId=5')}>
            Get Kite Wallet Details
          </button>
          <button className="btn btn-success m-2" onClick={() => makeApiRequest('https://moneymantraai.com/api/accounts/get-kite-order?userId=5')}>
            Get Kite Orders
          </button>
          <button className="btn btn-success m-2" onClick={() => makeApiRequest('https://moneymantraai.com/api/excel/report/ten-ema-algo1', 'POST', { instrumentToken: 256265, noOfPoints: 5 })}>
            Send Report to Mail
          </button>
        </div>
        <textarea id="response-text" className="form-control mt-3" rows="10" value={responseText} readOnly></textarea>
      </div>
 </div>
    </div>
  );
}

export default ControlandMonitor;
