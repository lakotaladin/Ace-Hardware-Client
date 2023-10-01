import React, { useEffect, useState } from "react";
import "./account.css";
import {
  RightOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { getUserOrders } from "../../functions/user";
import Header from "../../components/nav/Header";
import ScrollOnTopButton from "../../components/ScrollOnTop/ScrollOnTopButton";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Invoice from "../../components/order/Invoice";

const History = ({ history }) => {
  const [orders, setOrders] = useState([]);
  const [activeLink, setActiveLink] = useState("History");
  // Load all orders
  useEffect(() => {
    loadUserOrders();
  }, []);

  //  Fetch user from firebase

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  // Orders
  console.log("ORDERI SU ", orders);
  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    toast.success("Succesfully Log Out!");
    history.push("/login");
  };
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr
          style={{
            backgroundColor: "#D40029",
            color: "white",
            letterSpacing: "1px",
          }}
        >
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined
                  style={{ color: "green", transform: "scale(1.3)" }}
                />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      style={{ backgroundColor: "#D40029", color: "white", width: "200px" }}
      className="printbutton btn m-auto btn-sm m-2 p-1 btn-block"
    >
      <PrinterOutlined
        style={{ transform: "scale(1.5)", marginRight: "15px" }}
      />
      Download PDF
    </PDFDownloadLink>
  );
  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="w-100 m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <>
      <Header />
      {/* User header */}
      <div className="accountInfo  bg-white d-flex flex-column">
        <div className="navigation-container d-flex flex-row">
          <p className="p-0 m-0" style={{ color: "grey", fontSize: "12px" }}>
            <Link style={{ textDecoration: "none" }} to="/">
              Ace Hardware
            </Link>{" "}
            <RightOutlined className="arrow-left" /> History page
          </p>
        </div>
        <div className="container-h1-link d-flex flex-row w-100 p-0 m-0">
          <div className="p-0 m-0 w-50 d-flex">
            <h1 style={{ fontWeight: "400" }}>My Account</h1>
          </div>
          <div className="nav-bar">
            <Link
              to="/account"
              onClick={() => handleNavLinkClick("Account")}
              className={`nav ${activeLink === "Account" ? "active" : ""}`}
            >
              Account
            </Link>
            <Link
              to="/myaccount"
              onClick={() => handleNavLinkClick("Profile")}
              className={`nav ${activeLink === "Profile" ? "active" : ""}`}
            >
              Profile
            </Link>
            <Link
              to="/user/wishlist"
              onClick={() => handleNavLinkClick("Wishlist")}
              className={`nav ${activeLink === "Wishlist" ? "active" : ""}`}
            >
              Wishlist
            </Link>
            <Link
              to="/user/history"
              onClick={() => handleNavLinkClick("History")}
              className={`nav ${activeLink === "History" ? "active" : ""}`}
            >
              History
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
      {/* Section */}
      <div
        style={{ overflowX: "scroll" }}
        className="global-profile w-100 m-auto d-flex flex-column mb-3 p-0"
      >
        <div
          style={{
            height: "auto",
            width: "1200px",
            position: "relative",
          }}
          className="ordersection text-center m-auto"
        >
          <h4>
            {orders.length > 0 ? (
              <p style={{ fontSize: "30px", marginTop: "2%" }}>
                {user.name} {user.lastName}'s purchase orders
              </p>
            ) : (
              "No purchase orders"
            )}
          </h4>

          {showEachOrders()}
        </div>
      </div>
      <Footer />
      <ScrollOnTopButton />
    </>
  );
};

export default History;