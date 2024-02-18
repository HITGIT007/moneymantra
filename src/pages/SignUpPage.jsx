import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/App.css";
import NavigationBar from "../components/NavigationBar";

function SignUpPage() {
  const [step, setStep] = useState(1); // Track current step of the form
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

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "role":
        setRole(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "fullName":
        setFullName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "adminPassword":
        setAdminPassword(value);
        break;
      case "pan":
        setPan(value);
        break;
      default:
        break;
    }
  };

  const renderStepForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="col-md-6 mb-4 ">
              <div className=" form-outline w-[30vw] ">
                <label className="form-label" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control w-full"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className=" form-outline w-[30vw]">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="col-md-6 mb-4">
              <div className=" form-outline w-[30vw]">
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className=" form-outline w-[30vw]">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className=" form-outline w-[30vw]">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="col-md-6 mb-4">
              <div className=" form-outline w-[30vw]">
                <label className="form-label" htmlFor="role">
                  Role
                </label>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={role}
                  onChange={handleChange}
                  required
                >
                  <option value="2">User</option>
                  <option value="1">Admin</option>
                </select>
              </div>
            </div>
            {role === "1" && (
              <div className="col">
                <label className="form-label" htmlFor="adminPassword">
                  Admin Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="adminPassword"
                  name="adminPassword"
                  value={adminPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {role === "2" && (
              <div className="col">
                <label className="form-label" htmlFor="pan">
                  PAN
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pan"
                  name="pan"
                  value={pan}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NavigationBar />
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
                  Money Mantra is a cutting-edge financial platform dedicated to
                  empowering investors with smart, data-driven strategies for
                  the stock market. At the heart of our mission lies a
                  commitment to democratizing financial success through the use
                  of advanced artificial intelligence. We provide both novice
                  traders and seasoned investors with the tools they need to
                  make informed decisions, minimize risk, and capitalize on
                  growth opportunities. With Money Mantra, you gain a trusted
                  partner in your financial journey, ensuring that every move
                  you make is backed by expertise and precision, paving your
                  path to financial prosperity.
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
                  <div
                    className="card-body px-4 py-4 px-md-4 flex justify-center text-white rounded h-[70vh] w-[40vw] bg-red-400 overflow-auto shadow-lg "
                    style={{ background: "#0d1a40" }}
                  >
                    <form onSubmit={handleSubmit}>
                      {/* Step indicators */}
                      <div className="mb-4 flex gap-3 justify-evenly">
                        {[1, 2, 3].map((indicator) => (
                          <div
                            key={indicator}
                            className={`h-10 w-10 px-3 py-2 bg-slate-500 rounded-full cursor-pointer step-indicator step-circle ${
                              indicator === step ? "bg-black" : ""
                            }`}
                            onClick={() => setStep(indicator)} // Add this line
                          >
                            {indicator}
                          </div>
                        ))}
                      </div>
                      {/* Render the form fields based on the current step */}
                      {renderStepForm()}

                      {/* Navigation buttons for multi-step form */}
                      <div className="d-flex justify-content-between absolute bottom-3 w-full">
                        {step > 1 && (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setStep(step - 1)}
                          >
                            Previous
                          </button>
                        )}
                        {step < 3 && (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleNextStep}
                          >
                            Next
                          </button>
                        )}
                        {step === 3 && (
                          <button type="submit" className="btn btn-success">
                            Sign Up
                          </button>
                        )}
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
