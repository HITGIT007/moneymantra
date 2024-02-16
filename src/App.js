import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ControlandMonitor from "./pages/ControlandMonitor";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/controlandmonitor" element={<ControlandMonitor />} />
        <Route path="/contact" element={<Footer />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      <ToastContainer hideProgressBar autoClose={3000} />
    </Router>
  );
}

export default App;
