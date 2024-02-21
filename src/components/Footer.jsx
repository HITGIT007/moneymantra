import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import MailOutline from "@mui/icons-material/MailOutline";
import Phone from "@mui/icons-material/Phone";
import Pinterest from "@mui/icons-material/Pinterest";
import Room from "@mui/icons-material/Room";
import Twitter from "@mui/icons-material/Twitter";

import styled from "styled-components";
import React, { useState } from "react";
import NavigationBar from "./NavigationBar";

const Container = styled.div`
  display: flex;
  background-color: #d8d3d3;
  margin: 0;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  width: 70%;
  margin: 20px 0px;
  margin-left: 150px;
`;

const SocialContainer = styled.div`
  display: flex;
  margin-left: 150px;
  align-items: center;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Payment = styled.img`
  width: 30%;
`;

const Footer = () => {
  // Handle the submission of the contact form
  const handleSubmit = (event) => {
    event.preventDefault();
    const contactData = {
      name,
      email,
      phoneNumber,
      message,
    };
    console.log(contactData);
    // Send the data to a server or email service as needed
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  return (
    <>
    <NavigationBar/>
      <Container className=" plain-background" style={{height:"89vh"}}>
        <Left className="plain-background">
          <Desc className="text-white">
            Money Mantra provides unparalleled 24/7 customer support, ensuring
            your financial queries are addressed anytime, day or night. Our team
            offers extensive assistance, guiding you through complex investment
            decisions with ease and expertise. Committing to your continuous
            financial growth, Money Mantra's support is just a click away,
            fostering confidence and convenience in your trading journey.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
          </SocialContainer>
        </Left>

        <Right className="plain-background text-secondary">
          <Title>Contact</Title>
          <div  style={{width:"25vw"}}>

          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-2">
            <label className="form-label" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                className="form-control "
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
             
            </div>

            {/* Email Field */}
            <div className="form-outline mb-2">
            <label className="form-label" htmlFor="email">
                Your Email
              </label>
              <input
                type="email"
                className="form-control "
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
             
            </div>

            {/* Phone Number Field */}
            <div className="form-outline mb-2">
              <label className="form-label" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control "
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="form-outline mb-2">
              <label className="form-label" htmlFor="message">
                Your Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary mt-2  btn-block">
              Send Message
            </button>
          </form>
          </div>
        </Right>
      </Container>
    </>
  );
};

export default Footer;
