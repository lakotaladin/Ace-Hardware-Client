import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Footer from "../components/footer/Footer";
import Header from "../components/nav/Header";
import "./storeinfo.css";
import React from "react";
import img1 from "../resources/img1.png";
import img2 from "../resources/img2.png";
import img3 from "../resources/img3.png";
import img4 from "../resources/img4.png";
import img5 from "../resources/img5.png";
import img6 from "../resources/img6.png";
// import img7 from "../resources/img7.png";
import check from "../resources/ace_check.png";
import { LeftOutlined } from "@ant-design/icons";
import Storetime from "../components/Storeworktime/Storetime";

const Storeinfo = () => {
  return (
    <>
      <Header />
      <div className="global-store d-flex flex-column w-100 p-0 mb-4">
        <div className="globall w-100 p-0 d-flex flex-column">
          <div className="containerr d-flex flex-column">
            <div className="navigation-container d-flex flex-row">
              <p
                className="p-0 m-0"
                style={{ color: "grey", fontSize: "12px" }}
              >
                <LeftOutlined className="arrow-left" />
                <Link style={{ textDecoration: "none" }} to="/">
                  Ace Hardware
                </Link>{" "}
                / Store Details
              </p>
            </div>
            <div className="name-store d-flex flex-row justify-content-between w-100 p-3 m-0">
              <div className="store-text  d-flex flex-column p-4 m-0">
                <h4>Calais Ace Home Center</h4>
                <h6>Calais, ME 04619</h6>
                <span
                  style={{ width: "100%", fontSize: "14px", color: "black" }}
                >
                  <Storetime style={{ color: "black" }} />
                </span>
              </div>
              <div className="store-right text-center align-items-center d-flex flex-column p-4 m-0">
                <div className="check w-100 d-flex flex-row p-0 m-0">
                  <img className="check" src={check} alt="check" />
                  <h6>This is your store</h6>
                </div>
                <Link to="/location">
                  <button className="change-store p-2 bg-white">
                    Change Store
                  </button>
                </Link>
              </div>
            </div>
            <div className="cards w-100 pt-3 gap-4 d-flex flex-row p-0 mt-3">
              <div className="card w-50 m-0 p-0">
                <img src={img1} alt="Store info" />
              </div>
              <div className="bg-white card d-flex w-50 justify-content-center align-items-center m-0 p-0">
                <img style={{ width: "40%" }} src={img2} alt="Store info" />
              </div>
            </div>
            <div className="cards w-100 pt-3 gap-4 d-flex flex-row p-0 mt-3">
              <div className="card w-50 m-0 p-0">
                <img style={{ width: "100%" }} src={img3} alt="Store info" />
              </div>
              <div className="bg-white card d-flex w-50 justify-content-center align-items-center m-0 p-0">
                <img style={{ width: "100%" }} src={img4} alt="Store info" />
              </div>
            </div>
            <div className="cards w-100 pt-3 gap-4 d-flex flex-row p-0 mt-3">
              <div className="card w-50 m-0 p-0">
                <img style={{ width: "100%" }} src={img5} alt="Store info" />
              </div>
              <div className="card d-flex w-50 justify-content-center align-items-center m-0 p-0">
                <img style={{ width: "100%" }} src={img6} alt="Store info" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Storeinfo;
