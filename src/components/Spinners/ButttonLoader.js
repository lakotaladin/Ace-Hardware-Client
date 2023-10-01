import React from "react";
import "../Spinners/buttonstyle.css";
import FadeLoader from "react-spinners/FadeLoader";

const ButttonLoader = () => {
  return (
    <div className="buttonspinner">
      <FadeLoader
        color="white"
        cssOverride={{
          transform: "scale(0.5)",
          padding: "0%",
          margin: "12%",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          position: "absolute",
        }}
        width={5}
      />
    </div>
  );
};

export default ButttonLoader;
