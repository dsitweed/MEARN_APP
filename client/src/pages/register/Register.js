import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Popover, Typography } from "@mui/material";

import "./register.css";

const baseURL =
  process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passValid, setPassValid] = useState(""); //validation password
  const [anchorEl, setAnchorEl] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //Chan reload lai trang do an submit form
    if (password !== passValid) {
      openClosePopup("Valid password wrong!");
      return;
    }
   if (validateEmail(email) === null) {
    openClosePopup("Valid email wrong!");
    return;
   }

    try {
      const res = await axios.post(baseURL + "/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      // console.log(res.data);
      res.data && window.location.replace("/login");
    } catch (err) {
      console.log("Err register:", err);
      openClosePopup("Something went wrong!");
    }
  };
  // open and close popup after 1s
  const openClosePopup = (notification) => {
    setError(notification);
    setAnchorEl(true);

    setTimeout(() => {
      setAnchorEl(false);
    }, 1000);
  }
  return (
    <div className="register">
      <div className="registerBox">
        <span className="registerTitle">Register</span>
        <form className="registerForm">
          <label>Username</label>
          <input
            className="registerInput"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password verification</label>
          <input
            className="registerInput"
            type="password"
            placeholder="password verification"
            onChange={(e) => setPassValid(e.target.value)}
          />
          <button
            className="registerButton"
            disabled={!username || !email || !password || !passValid}
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
        <button className="registerLoginButton">
          <Link className="link" to="/login">
            {" "}
            LOGIN
          </Link>
        </button>
        <Popover
          open={anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 0, left: 500 }}
        >
          <Typography sx={{ p: 2 }} color={"red"} >{error}</Typography>
        </Popover>
      </div>
    </div>
  );
}

// return boolean
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};