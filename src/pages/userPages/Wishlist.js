import React, { useEffect, useState } from "react";
import "./account.css";
import {
  DeleteOutlined,
  HeartFilled,
  LikeFilled,
  RightOutlined,
} from "@ant-design/icons";
import Header from "../../components/nav/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import firebase from "firebase/compat/app";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input, Button } from "antd";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [activeLink, setActiveLink] = useState("Wishlist");
  const [wishlist, setWishlist] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch user from firebase

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadWishlist();
  }, []);
  let history = useHistory();

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleSearch = () => {
    const filteredResults = wishlist.filter((product) => {
      const productName = product.title.toLowerCase();
      const productId = product._id.toString().toLowerCase();
      const searchText = searchValue.toLowerCase();
      return productName.includes(searchText) || productId.includes(searchText);
    });

    setSearchResults(filteredResults);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchResults([]);
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
            <RightOutlined className="arrow-left" /> Wishlist
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
        style={{ height: "auto", overflowX: "none" }}
        className="global-profile w-100 d-flex flex-column mb-3 p-0"
      >
        <div
          style={{
            height: "auto",
            display: "flex",
            overflowX: "scroll",
            justifyContent: "center",
          }}
          className="wishdiv flex-column col"
        >
          <h4
            style={{
              margin: "auto",
              marginTop: "2%",
              marginBottom: "2%",
              textAlign: "center",
              fontSize: "30px",
              letterSpacing: "1px",
            }}
          >
            {user.name} {user.lastName}'s Wishlist
          </h4>
          <div className="search-filter-container d-flex flex-row mb-4 p-1 align-items-center">
            <Input
              placeholder="Search by name or ID"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              prefix={<SearchOutlined />}
              suffix={
                searchValue && (
                  <CloseCircleOutlined
                    onClick={handleClearSearch}
                    style={{ cursor: "pointer" }}
                  />
                )
              }
              onPressEnter={handleSearch}
              style={{
                width: "300px",
                marginLeft: "auto",
                marginRight: "16px",
                padding: "10px 7px",
                backgroundColor: "white",
                color: "black",
              }}
            />
            <Button
              type="primary"
              style={{
                backgroundColor: "#D40029",
                color: "white",
                width: "100px",
                height: "40px",
                marginRight: "5%",
                fontWeight: "bold",
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          {searchResults.length > 0 ? (
            <div>
              {searchResults.map((p) => (
                <div
                  key={p._id}
                  style={{
                    margin: "auto",
                    marginBottom: "0.5%",
                    width: "70%",
                    borderRadius: "0px",
                    borderBottom: "5px solid #D40029",
                    borderRight: "2px dashed lightgray",
                    borderLeft: "2px dashed lightgray",
                    borderTop: "2px dashed lightgray",
                    backgroundColor: "white",
                    display: "flex",
                  }}
                  className="alert d-flex flex-column alert-secondary"
                >
                  <div className="heart w-100 p-0 gap-1 d-flex  align-items-center m-0 mb-2">
                    <HeartFilled style={{ color: "#D40029" }} />
                    <LikeFilled style={{ color: "#D40029" }} />
                  </div>
                  <div className="wishproductcontainer d-flex flex-row align-items-center w-100 p-0 m-0">
                    <div className="divproduct d-flex  gap-1 w-100">
                      <span style={{ fontWeight: "bold" }}>Product:</span>
                      <Link to={`/product/${p.slug}`}>{p.title}</Link>
                    </div>
                    <span
                      style={{ border: "1px solid lightgray" }}
                      onClick={() => handleRemove(p._id)}
                      className="btn btn-sm"
                    >
                      <DeleteOutlined
                        style={{ transform: "scale(1.6)" }}
                        className="text-danger"
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {wishlist.map((p) => (
                <div
                  key={p._id}
                  style={{
                    margin: "auto",
                    marginBottom: "5%",
                    width: "600px",
                    borderRadius: "0px",
                    borderBottom: "5px solid #D40029",
                    borderRight: "2px dashed lightgray",
                    borderLeft: "2px dashed lightgray",
                    borderTop: "2px dashed lightgray",
                    backgroundColor: "white",
                    display: "flex",
                  }}
                  className="alert d-flex flex-column alert-secondary"
                >
                  <div className="heart w-100 p-0 gap-1 d-flex  align-items-center m-0 mb-2">
                    <HeartFilled style={{ color: "#D40029" }} />
                    <LikeFilled style={{ color: "#D40029" }} />
                  </div>
                  <div className="wishproductcontainer d-flex flex-row align-items-center w-100 p-0 m-0">
                    <div className="divproduct d-flex  gap-1 w-100">
                      <span style={{ fontWeight: "bold" }}>Product:</span>
                      <Link to={`/product/${p.slug}`}>{p.title}</Link>
                    </div>
                    <span
                      style={{ border: "1px solid lightgray" }}
                      onClick={() => handleRemove(p._id)}
                      className="btn btn-sm"
                    >
                      <DeleteOutlined
                        style={{ transform: "scale(1.6)" }}
                        className="text-danger"
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
