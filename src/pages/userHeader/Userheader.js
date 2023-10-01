import { RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "../userHeader/userheader.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import firebase from "firebase/compat/app";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Userheader = () => {
  const [activeLink, setActiveLink] = useState("Account");

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };
  return (
    <div className="accountInfo bg-white container d-flex flex-column">
      <div className="navigation-container d-flex flex-row">
        <p className="p-0 m-0" style={{ color: "grey", fontSize: "12px" }}>
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>{" "}
          <RightOutlined className="arrow-left" /> Account
        </p>
      </div>
      <div className="container-h1-link d-flex flex-row w-100 p-0 m-0">
        <div className="p-0 m-0 w-50 d-flex">
          <h1 style={{ fontWeight: "400" }}>My Account</h1>
        </div>
        <div className="nav-bar">
          <Link
            to="#"
            onClick={() => handleNavLinkClick("Account")}
            className={`nav ${activeLink === "Account" ? "active" : ""}`}
          >
            Account
          </Link>
          <Link
            to="#"
            onClick={() => handleNavLinkClick("Profile")}
            className={`nav ${activeLink === "Profile" ? "active" : ""}`}
          >
            Profile
          </Link>
          <Link
            to="#"
            onClick={() => handleNavLinkClick("Ace Rewards")}
            className={`nav ${activeLink === "Ace Rewards" ? "active" : ""}`}
          >
            Ace Rewards
          </Link>
          <Link
            to="#"
            onClick={() => handleNavLinkClick("Adress Book")}
            className={`nav ${activeLink === "Adress Book" ? "active" : ""}`}
          >
            Adress Book
          </Link>
          <Link
            to="#"
            onClick={() => handleNavLinkClick("Purachase History")}
            className={`nav ${
              activeLink === "Purachase History" ? "active" : ""
            }`}
          >
            Purachase History
          </Link>
          <Link
            to="#"
            onClick={() => handleNavLinkClick("Lists")}
            className={`nav ${activeLink === "Lists" ? "active" : ""}`}
          >
            Lists
          </Link>
          <button
            style={{ background: "none", border: "none" }}
            onClick={logout}
            className={`nav ${activeLink === "Log Out" ? "active" : ""}`}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Userheader;
