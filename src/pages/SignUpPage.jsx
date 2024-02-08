import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/App.css";
import NavigationBar from "../components/NavigationBar";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("2");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [pan, setPan] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userData = {
      username: username,
      name: fullName,
      email: email,
      mobile: phoneNumber,
      password: password,
      userType: role,
      ...(role === "2" && { pan: pan }),
      ...(role === "1" && { adminPassword: adminPassword }),
      ...(role === "2" && { apiKey: "wwqeqwew" }),
      ...(role === "2" && { apiSecret: "weqwweqqe" }),
    };

    console.log(
      "userData================================================>",
      userData
    );

    try {
      const response = await axios.post(
        "https://moneymantraai.com/api/auth/signup",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Signup successful:", response.data);

      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        sessionStorage.setItem("logged", "true");
        sessionStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <>
      <NavigationBar />
      {/* <div className="plain-background" style={{ borderRadius: "15px", background: "#0a142f", color: "white" }}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6  py-4">
            <div className="card" style={{ borderRadius: "15px", }}>
              <div className="card-body p-3 plain-background py-5" style={{ borderRadius: "15px" }}>
                <form onSubmit={handleSubmit} style={{}}>
                  <div className="row mb-2">
                    <div className="col">
                      <label className="form-label text-white" htmlFor="fullName">Full Name</label>
                      <input style={{ background: "#243047" }} type="text" className="form-control text-white" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div className="col">
                      <label className="form-label text-white" htmlFor="username">Username</label>
                      <input style={{ background: "#243047" }} type="text" className="form-control text-white" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <label className="form-label text-white" htmlFor="email">Email address</label>
                      <input style={{ background: "#243047" }} type="email" className="form-control text-white" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="col">
                      <label className="form-label text-white" htmlFor="phoneNumber">Phone Number</label>
                      <input style={{ background: "#243047" }} type="tel" className="form-control text-white" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <label className="form-label text-white" htmlFor="password">Password</label>
                      <input style={{ background: "#243047" }} type="password" className="form-control text-white" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="col">
                      <label className="form-label text-white" htmlFor="confirmPassword">Confirm Password</label>
                      <input style={{ background: "#243047" }} type="password" className="form-control text-white" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <label className="form-label text-white" htmlFor="role">Role</label>
                      <select style={{ background: "#243047" }} className="form-select text-white" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="2">User</option>
                        <option value="1">Admin</option>
                      </select>
                    </div>
                    {role === "1" &&
                      <div className="col">
                        <label className="form-label text-white" htmlFor="adminpassword">Admin Password</label>
                        <input style={{ background: "#243047" }} type="password" className="form-control text-white" id="adminpassword" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required />
                      </div>
                    }
                    {role === "2" &&
                      <div className="col">
                        <label className="form-label text-white" htmlFor="pan">PAN</label>
                        <input style={{ background: "#243047" }} type="text" className="form-control text-white" id="pan" value={pan} onChange={(e) => setPan(e.target.value)} required />
                      </div>
                    }
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <>
        {/* Section: Design Block */}
        <section className="background-radial-gradient overflow-hidden">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    .background-radial-gradient {\n      background-color: hsl(218, 41%, 15%);\n      background-image: radial-gradient(650px circle at 0% 0%,\n          hsl(218, 41%, 35%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%),\n        radial-gradient(1250px circle at 100% 100%,\n          hsl(218, 41%, 45%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%);\n    }\n\n    #radius-shape-1 {\n      height: 220px;\n      width: 220px;\n      top: -60px;\n      left: -130px;\n      background: radial-gradient(#44006b, #ad1fff);\n      overflow: hidden;\n    }\n\n    #radius-shape-2 {\n      border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;\n      bottom: -60px;\n      right: -110px;\n      width: 300px;\n      height: 300px;\n      background: radial-gradient(#44006b, #ad1fff);\n      overflow: hidden;\n    }\n\n    .bg-glass {\n      background-color: hsla(0, 0%, 100%, 0.9) !important;\n      backdrop-filter: saturate(200%) blur(25px);\n    }\n  ",
            }}
          />
          <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-2">
            <div className="row gx-lg-5 align-items-center mb-5">
              <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                <h1
                  className="my-5 display-5 fw-bold ls-tight"
                  style={{ color: "hsl(218, 81%, 95%)" }}
                >
                  The best offer <br />
                  <span style={{ color: "hsl(218, 81%, 75%)" }}>
                    for your business
                  </span>
                </h1>
                <p
                  className="mb-4 opacity-70"
                  style={{ color: "hsl(218, 81%, 85%)" }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Temporibus, expedita iusto veniam atque, magni tempora
                  mollitia dolorum consequatur nulla, neque debitis eos
                  reprehenderit quasi ab ipsum nisi dolorem modi. Quos?
                </p>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                <div
                  id="radius-shape-1"
                  className="position-absolute rounded-circle shadow-5-strong"
                />
                <div
                  id="radius-shape-2"
                  className="position-absolute shadow-5-strong"
                />
                <div className="card bg-glass">
                  <div className="card-body px-4 py-4 px-md-4  text-white rounded" style={{background:"#0d1a40"}}>
                    <form onSubmit={handleSubmit}>
                      {/* 2 column grid layout with text inputs for the first and last names */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label " htmlFor="fullName">
                              Full Name
                            </label>
                            <input
                              style={{ background: "#243047" }}
                              type="text"
                              className="form-control text-white"
                              id="fullName"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label " htmlFor="username">
                              Username
                            </label>
                            <input
                              style={{ background: "#243047" }}
                              type="text"
                              className="form-control text-white"
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      {/* Email input */}
                      <div className="form-outline mb-2">
                        <label className="form-label " htmlFor="email">
                          Email address
                        </label>
                        <input
                          style={{ background: "#243047" }}
                          type="email"
                          className="form-control text-white"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      {/* Password input */}
                      <div className="form-outline mb-2">
                        <label className="form-label " htmlFor="password">
                          Password
                        </label>
                        <input
                          style={{ background: "#243047" }}
                          type="password"
                          className="form-control text-white"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-outline mb-2">
                        <label
                          className="form-label "
                          htmlFor="confirmPassword"
                        >
                          Confirm Password
                        </label>
                        <input
                          style={{ background: "#243047" }}
                          type="password"
                          className="form-control text-white"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      {/* Checkbox */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label " htmlFor="role">
                              Role
                            </label>
                            <select
                              style={{ background: "#243047" }}
                              className="form-select text-white"
                              id="role"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              required
                            >
                              <option value="2">User</option>
                              <option value="1">Admin</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            {role === "1" && (
                              <div className="col">
                                <label
                                  className="form-label "
                                  htmlFor="adminpassword"
                                >
                                  Admin Password
                                </label>
                                <input
                                  style={{ background: "#243047" }}
                                  type="password"
                                  className="form-control text-white"
                                  id="adminpassword"
                                  value={adminPassword}
                                  onChange={(e) =>
                                    setAdminPassword(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            )}
                            {role === "2" && (
                              <div className="col">
                                <label className="form-label " htmlFor="pan">
                                  PAN
                                </label>
                                <input
                                  style={{ background: "#243047" }}
                                  type="text"
                                  className="form-control text-white"
                                  id="pan"
                                  value={pan}
                                  onChange={(e) => setPan(e.target.value)}
                                  required
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Submit button */}
                      <div className="d-flex justify-content-center">

                      <button
                        type="submit"
                        className="btn btn-success btn-block mb-4"
                        style={{ width: "100%" }}
                      >
                        Sign up
                      </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section: Design Block */}
      </>
    </>
  );
}

export default SignUpPage;
