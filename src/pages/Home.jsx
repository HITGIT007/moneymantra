"use client";
import React, { useState } from "react";

// import { LampDemo, MenuItem } from "../atoms/MenuItem";
import NavigationBar from "../components/NavigationBar";
import { Input, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import { EvervaultCard } from "../atoms/EvervaultCard ";
// import CardPattern from "../atoms/CardPattern";
import { login } from "../services/api";
import { BackgroundBeams } from "../atoms/BackgroundBeams";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState(""); // State to hold error message
  const [role, setRole] = useState("2");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Assuming email, password, and role are defined in your component's state
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(email);
    const username = email;

    // Prepare the login data
    const loginData = isEmail
      ? { email, password, userType: role }
      : { username, password, userType: role };

    try {
      // Call the login function with username/password. Adjust the login function if necessary to accept email as well.
      const response = await login(loginData);

      console.log("Login successful:", response);

      // Navigate to Dashboard on successful login
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error
      );
      // Handle login error (e.g., display error message)
    }
  };

  return (
    <>
      <div className="h-[100vh] bg-black text-white">
        <NavigationBar />
        <BackgroundBeams />
        <div className="flex justify-between px-10">
          <div className="w-[50%] flex justify-center items-center ">
            <div>
              <div className="font-extrabold text-5xl py-10 text-white animate-typing overflow-hidden whitespace-nowrap">
                {" "}
                Lorem ipsum dolor sit
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quo
                eaque voluptates incidunt nemo illo unde iure pariatur id dicta,
                quidem distinctio est minima enim! Rerum temporibus quisquam
                eaque delectus?
              </div>
            </div>
          </div>

          <div className="w-[50%] h-[90vh] flex justify-center items-center">
            <div class=" flex justify-center backdrop-grayscale-0 bg-white/30 w-[30vw] h-[55vh] p-5 rounded-3xl shadow-lg">
              <form onSubmit={handleSubmit}>
                <div class="flex justify-center mb-3">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="bg-gray-200 px-2 w-[20vw] py-2 rounded-md  relative z-10 text-black"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div class="flex justify-center mb-3">
                  <input
                    type="password"
                    name=""
                    id=""
                    class="bg-gray-200 px-2 w-[20vw] py-2 rounded-md  relative z-10 text-black"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div class="flex justify-center mb-3">
                  <select
                    class="bg-gray-200 px-2 w-[20vw] py-2 rounded-md relative z-10 text-black"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="2">User</option>
                    <option value="1">Admin</option>
                  </select>
                </div>
                <div className="text-center mt-3 mb-3">
                  <Link to="/forgot-password" className=" ">
                    <u className="text-white">Forgot Password?</u>
                  </Link>
                </div>
                <div class="flex justify-center py-3">
                  <button
                    type="submit"
                    class="px-5 py-2 bg-yellow-400 text-black font-semibold"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
