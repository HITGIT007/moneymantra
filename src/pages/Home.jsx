"use client";
import React, { useState } from "react";

// import { LampDemo, MenuItem } from "../atoms/MenuItem";
import NavigationBar from "../components/NavigationBar";
import { Input, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import { EvervaultCard } from "../atoms/EvervaultCard ";
// import CardPattern from "../atoms/CardPattern";
import "../css/App.css"; // Reusing the same CSS for consistency
import { login } from "../services/api";

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
        <NavigationBar />
      <div className="h-[90vh] plain-background text-white px-5">
        {/* <BackgroundBeams /> */}
        <div className="flex justify-between  w-[100%] py-20  ">
          <div className="w-[60%]">
            <div className="">
              <div className=" overflow-hidden font-extrabold text-4xl text-white animate-typing  whitespace-nowrap py-2 ">
                Strategize Wealth, Maximize Growth.
              </div>
              <div className="w-[45vw] py-4 ">
                Money Mantra is a cutting-edge financial platform dedicated to
                empowering investors with smart, data-driven strategies for the
                stock market. At the heart of our mission lies a commitment to
                democratizing financial success through the use of advanced
                artificial intelligence. We provide both novice traders and
                seasoned investors with the tools they need to make informed
                decisions, minimize risk, and capitalize on growth
                opportunities. With Money Mantra, you gain a trusted partner in
                your financial journey, ensuring that every move you make is
                backed by expertise and precision, paving your path to financial
                prosperity.
              </div>
            </div>
            <Link
              to={"/signup"}
              className="px-3 py-2 bg-yellow-500  hover:bg-yellow-400 hover:shadow-lg hover:shadow-stone-300 text-black font-semibold cursor-pointer no-underline tracking-widest	"
            >
              EXPLORE
            </Link>
          </div>

          <div className="w-[40%]  flex justify-center items-center">
            <div class=" flex justify-center backdrop-grayscale-0 bg-white/30 w-[30vw] h-[55vh] p-5 rounded-3xl shadow-lg">
              <form onSubmit={handleSubmit}>
                <div class="flex justify-center mb-3">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="bg-gray-200 px-2 w-[20vw] py-2 rounded-md   text-black placeholder-orange-300"
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
                    class="bg-gray-200 px-2 w-[20vw] py-2 rounded-md  placeholder-orange-300  text-black"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div class="flex justify-center mb-3">
                  <select
                    class="bg-gray-200 px-2 w-[20vw] py-2 rounded-md  text-black"
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
                    class="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 hover:border-2 hover:tracking-widest hover:border-black text-black font-semibold "
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
