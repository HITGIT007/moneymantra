import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Nav({ name, toggleSidebar, isSidebarVisible }) {
  const [showDropdown, setShowDropdown] = useState(false); // Add state for dropdown visibility

  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours.toString().padStart(2, "0") : "12"; // the hour '0' should be '12'
    return `${day}/${month}/${year}`;
  };
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours.toString().padStart(2, "0") : "12"; // the hour '0' should be '12'
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };
  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center sticky top-0 px-3">
      <div className="flex gap-5">
        <button
          className={`text-xl cursor-pointer border rounded border-danger px-2 py-1`}
          onClick={toggleSidebar}
        >
          {isSidebarVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        <div className="flex space-x-4">
          <div className="relative">
            <button
              className="text-lg font-medium border border-transparent rounded-md px-3 py-1 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={() => setShowDropdown(!showDropdown)} // Toggle visibility directly here
            >
              <span className="mr-2">WELCOME {name.toUpperCase()}</span>
            </button>

            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-50 ${
                showDropdown ? "block" : "hidden"
              }`}
            >
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                Profile
              </button>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                Setting
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                onClick={() => {
                  sessionStorage.removeItem("logged");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="me-3">
          <span className="text-lg font-bold neon-text">
            {formatDate(currentTime)}
          </span>
        </div>
        <div className="px-2 py-2 rounded neon-text">
          <span className="text-lg font-bold">{formatTime(currentTime)}</span>
        </div>
      </div>
    </nav>
  );
}

export default React.memo(Nav);
