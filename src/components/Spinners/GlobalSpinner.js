import React from "react";
import "../Spinners/buttonstyle.css";
import ScaleLoader from "react-spinners/ScaleLoader";

const GlobalSpinner = () => {
  return (
    <div
      style={{
        overflow: "hidden",
        height: "100vh",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        zIndex: "999999999999999999999999999999999999",
        backgroundColor: "white",
      }}
      className="w-100 d-flex p-0 m-0"
    >
      <ScaleLoader
        color="#e51636"
        cssOverride={{
          padding: "0%",
          transform: "scale(1)",
          textAlign: "center",
          alignItems: "center",
          alignContent: "center",
          margin: "auto",
          display: "flex",
        }}
        width={9}
      />
    </div>
  );
};

export default GlobalSpinner;
