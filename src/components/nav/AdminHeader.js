import { HomeOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import acelogo from "../../resources/ace_logo.png";
import qr from "../../resources/qrcontactadmin.png";

const AdminHeader = () => {
  return (
    <>
      <div
        style={{ borderBottom: "5px solid #E52538" }}
        className="adminnav w-100 p-3 m-0 d-flex flex-row justify-content-around"
      >
        <div className="backarro p-0 m-0 d-flex flex-row align-items-center">
          <Link
            to="/"
            className="d-flex flex-row gap-3"
            style={{ color: "black", cursor: "pointer" }}
          >
            <HomeOutlined
              style={{ fontSize: "20px" }}
              className="adminnavarrow p-0 m-0"
            />
            <p className="p-0 m-0 d-flex">Back to home page</p>
          </Link>
        </div>
        <img
          src={acelogo}
          style={{ width: "200px", height: "110px" }}
          alt="Ace Hardware logo"
        />
        <div className="backarro p-0 m-0 d-flex flex-column align-items-center">
          <img src={qr} style={{ width: "100px" }} alt="contact" />
          <p style={{ fontSize: "12px" }} className="p-0 m-0">
            Scan QR code for support
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
