import React from "react";
import { Link } from "react-router-dom";

const Storetime = () => {
  const now = new Date();
  const currentHour = now.getHours();
  // Provera da li je trenutno vreme između 7 i 18 časova
  const isOpen = currentHour >= 7 && currentHour < 18;

  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to="/store-details"
    >
      <b>Calais Ace Home Center</b> - Calais, ME {"  "}
      <b>
        <span
          style={{ fontWeight: "bold", fontSize: "13px" }}
          className={isOpen ? "text-success" : "text-danger"}
        >
          {isOpen ? "Open" : "Closed"}
        </span>
      </b>{" "}
      until {isOpen ? "6 PM" : "tomorrow at 7 AM"}
    </Link>
  );
};

export default Storetime;
