import React, { useState } from "react";
import "../nav/Header.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, Space } from "antd";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import userLogo from "../../resources/header_user-circle-light_red.svg";
import starLogo from "../../resources/header_AR icon.svg";
import cartLogo from "../../resources/Korpa.svg";
import acestore from "../../resources/ace_store.png";
import acerewards from "../../resources/acerewards.png";
import ace_services from "../../resources/services.png";
import ace_services2 from "../../resources/services2.png";
import brands from "../../resources/brandsheader.png";
import brands2 from "../../resources/brandsheader2.png";
import egopower from "../../resources/egopower.png";

import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import logo from "../../resources/ace_logo.png";
import location from "../../resources/location_icon.svg";
import Storetime from "../Storeworktime/Storetime";
import Search from "../forms/Search";

const { SubMenu } = Menu;

const Header = () => {
  const [currnet, setCurrent] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [openMenu3, setOpenMenu3] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const items = [
    {
      key: "1",
      label: (
        <Link title="Shop by brands" to="/shop">
          <span style={{ fontWeight: "bold" }}>Shop by Brand</span>
        </Link>
      ),
      children: [
        {
          key: "2-1",
          label: (
            <div className="w-100 bg-white d-flex flex-row gap-4 p-0 m-0">
              <div>
                <h5 className="bg-white">Featured brands</h5>
                <img
                  style={{ width: "100%" }}
                  src={brands}
                  alt="Brands images"
                />
              </div>
              <div className="bg-white">
                <h5 className="bg-white">Brands A-Z</h5>
                <img style={{ width: "100%" }} src={brands2} alt="Brands" />
              </div>
            </div>
          ),
        },
      ],
    },
    {
      key: "2",
      label: (
        <a
          title="Learn about Ace Gift Cards"
          href="https://www.acehardware.com/gift-cards"
        >
          <span style={{ fontWeight: "bold" }}>Ace Gift Card</span>
        </a>
      ),
      children: [],
    },
    {
      key: "3",
      label: (
        <Link title="Grills and Smokers" to="/category/grills-and-smokers">
          <span>Grills & Smokers</span>
        </Link>
      ),
      children: [
        {
          key: "3-2",
          label: (
            <>
              <div className="navcategory w-100 m-0 p-0 d-flex flex-row">
                <div
                  style={{ width: "130px", height: "275px" }}
                  className="navdiv d-flex  gap-2 flex-column p-0 m-0"
                >
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/gas-grills"
                  >
                    <span>Gas Grills</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/pellet-grills"
                  >
                    <span>Pellet Grills</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/charcoal-grills"
                  >
                    <span>Charcoal Grills</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/kamado-grills"
                  >
                    <span>Kamado Grills</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/smokers"
                  >
                    <span>Smokers</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/charcoal"
                  >
                    <span>Charcoal</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/electric-grills"
                  >
                    <span>Electric Grills</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/pizza-ovens"
                  >
                    <span>Pizza Ovens</span>
                  </Link>
                </div>
                <div
                  style={{ width: "150px" }}
                  className="navdiv d-flex text-align-center p-0 m-0"
                >
                  <img style={{ width: "100%" }} src={egopower} alt="Brand" />
                </div>
              </div>
            </>
          ),
        },
      ],
    },
    {
      key: "4",
      label: (
        <Link title="Outdoor Power Equipment" to="/shop">
          <span>Lawn and Garden</span>
        </Link>
      ),
      children: [
        {
          key: "4-3",
          label: (
            <>
              <div className="navcategory w-100 m-0 p-0 d-flex flex-row">
                <div
                  style={{ width: "140px", height: "245px" }}
                  className="navdiv d-flex flex-column gap-2 p-0 m-0"
                >
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/lawn-mowers"
                  >
                    <span>Lawn Mowers</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/riding-mowers"
                  >
                    <span>Riding Mowers</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/snow-blowers"
                  >
                    <span>Snow Blowers</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/generators"
                  >
                    <span>Generators</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/pressure-washers"
                  >
                    <span>Pressure Washers</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/tillers-&-cultivators"
                  >
                    <span>Tillers & Cultivators</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/log-splitters"
                  >
                    <span>Log Splitters</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/chippers"
                  >
                    <span>Pizza Ovens</span>
                  </Link>
                </div>
                <div
                  style={{ width: "150px" }}
                  className="navdiv d-flex text-align-center p-0 m-0"
                >
                  <img style={{ width: "100%" }} src={egopower} alt="Brand" />
                </div>
              </div>
            </>
          ),
        },
      ],
    },
    {
      key: "5",
      label: (
        <Link title="Lawn and Garden" to="/shop">
          <span>Lawn Care</span>
        </Link>
      ),
      children: [
        {
          key: "4-3",
          label: (
            <>
              <div className="navcategory w-100 m-0 p-0 d-flex flex-row">
                <div
                  style={{ width: "120px", height: "245px" }}
                  className="navdiv d-flex flex-column gap-2 p-0 m-0"
                >
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/weed-killers"
                  >
                    <span>Weed Killers</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/spreaders"
                  >
                    <span>Spreaders</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/sprayers"
                  >
                    <span>Sprayers</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/soil-conditioners"
                  >
                    <span>Soil Conditioners</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/fungicides"
                  >
                    <span>Fungicides</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/garden-tools"
                  >
                    <span>Garden Tools</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/soil"
                  >
                    <span>Soil</span>
                  </Link>
                  <Link
                    className="grillsandsmokerslink"
                    style={{ color: "black" }}
                    to="/sub/mulch"
                  >
                    <span>Mulch</span>
                  </Link>
                </div>
                <div
                  style={{ width: "150px" }}
                  className="navdiv d-flex text-align-center p-0 m-0"
                >
                  <img style={{ width: "100%" }} src={egopower} alt="Brand" />
                </div>
              </div>
            </>
          ),
        },
      ],
    },
    {
      key: "6",
      label: (
        <Link title="Tools" to="/shop">
          <span>Tools</span>
        </Link>
      ),
      children: [],
    },
    {
      key: "7",
      label: (
        <Link title="Paint and Supplies" to="/shop">
          <span>Paint and Supplies</span>
        </Link>
      ),
      children: [],
    },
    {
      key: "8",
      label: (
        <Link title="Heating and Cooling" to="/shop">
          <span>Heating and Cooling</span>
        </Link>
      ),
      children: [],
    },
    {
      key: "9",
      label: (
        <Link title="Home and Decor" to="/shop">
          <span>Home and Decor</span>
        </Link>
      ),
      children: [],
    },
    {
      key: "10",
      label: (
        <Link title="Building Supplies" to="/shop">
          <span>Building Supplies</span>
        </Link>
      ),
      children: [],
    },
    {
      key: "11",
      label: (
        <Link title="Hardware" to="/shop">
          <span>Hardware</span>
        </Link>
      ),
      children: [],
    },
  ];

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const toggleMenu2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const toggleMenu3 = () => {
    setOpenMenu3(!openMenu3);
  };

  const handleClick = () => {
    // bla bla
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
    <>
      <div className="global-header p-0 m-0">
        <div className="info-div d-flex">
          <div className="info-one">
            <p className="info-text">
              <b>We Deliver.</b> Get what you need, when you need it.
              <u>
                <a href="https://www.acehardware.com/we-deliver">Learn more</a>
              </u>
            </p>
          </div>
          <div className="info-two">
            <a href="https://www.acehardware.com/b2b-home">Business Accounts</a>
            <a href="https://acehardware.bold360ps.com/?Touchpoint=Support%20Center">
              Customer Service
            </a>
            <Link to="/Location">Store Locator</Link>
          </div>
        </div>

        <div className="Header-global-center-div w-100">
          {!user ? (
            <div className="Logo-search-global">
              <div className="Logo-search-div gap-4 d-flex w-100">
                <Link to="/">
                  <img id="ace_logo" src={logo} alt="Ace Hardware logo" />
                </Link>
                <span className="searchbar w-100  p-0 m-0">
                  <Search />
                </span>

                <div className="login-and-register-section">
                  <div className="header-login-register-section gap-2 w-50">
                    <img
                      className="headerLogo"
                      src={userLogo}
                      alt="Login/Register"
                    />
                    <p className="p-0 m-0">
                      <b style={{ fontWeight: "500", fontSize: "14px" }}>
                        Hi there,
                      </b>
                      <br /> <Link to="/login">Sign in</Link> |{" "}
                      <Link to="/register">New Account</Link>
                    </p>
                  </div>
                  <div className="header-login-register-section">
                    <img src={starLogo} alt="Login/Register" />
                    <p className="p-2 m-0">
                      <a
                        href="https://www.acehardware.com/ace-rewards"
                        target="_blank"
                      >
                        <b style={{ fontWeight: "500", fontSize: "14px" }}>
                          Ace Rewards
                        </b>
                        <br /> Learn more
                      </a>
                    </p>
                  </div>
                  <div className="header-login-register-section">
                    <Link className="d-flex flex-row p-0 m-0" to="/cart">
                      <img
                        className="headerLogo"
                        src={cartLogo}
                        alt="Login/Register"
                      />
                      <p className="p-2 m-0">
                        <b style={{ fontWeight: "500", fontSize: "14px" }}>
                          Cart
                        </b>
                        <br />
                        <p style={{ fontSize: "14px" }}>
                          <b style={{ fontSize: "14px" }}>0</b> Items
                        </p>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <Menu
                style={{ cursor: "pointer" }}
                className="custom-menu-items"
                onClick={handleClick}
                selectedKeys={[currnet]}
                mode="horizontal"
              >
                <Dropdown
                  menu={{
                    items,
                  }}
                >
                  <Link
                    className="cascader"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space>Departments</Space>
                  </Link>
                </Dropdown>

                <a
                  title="Local Ad"
                  className="cascader"
                  href="https://www.acehardware.com/local-ad"
                >
                  <Space>Local Ad</Space>
                </a>
                <a
                  title="The Paint Studio"
                  className="cascader"
                  href="https://www.acehardware.com/thepaintstudio"
                >
                  <Space>The Paint Studio</Space>
                </a>
                <a
                  title="Ace Project Place"
                  className="cascader"
                  href="https://www.acehardware.com/aceprojectplace"
                >
                  <Space>Ace Project Place</Space>
                </a>
                <a
                  title="Ace Handyman Services"
                  className="cascader"
                  href="https://www.acehandymanservices.com/?utm_source=acehardware.com&utm_medium=referral&utm_campaign=header_link&source=ace_site"
                >
                  <Space>Ace Handyman Services</Space>
                </a>
              </Menu>
            </div>
          ) : (
            // Search and user register header user - logged
            <div className="Logo-search-global">
              <div className="Logo-search-div gap-4 d-flex w-100">
                <Link to="/">
                  <img id="ace_logo" src={logo} alt="Ace Hardware logo" />
                </Link>

                <span className="searchbar w-100  p-0 m-0">
                  <Search />
                </span>

                <div className="login-and-register-section">
                  <div className="header-login-register-section d-flex gap-2 w-50">
                    <img
                      className="headerLogo"
                      src={userLogo}
                      alt="Login/Register"
                    />
                    <p className="p-0 m-0">
                      <b style={{ fontWeight: "500", fontSize: "14px" }}>
                        Hi, {user.name}
                      </b>
                      <br />
                      <div
                        style={{ cursor: "pointer" }}
                        className="dropdown-container"
                      >
                        <b
                          title="Your Account"
                          style={{
                            fontWeight: "500",
                            fontSize: "14px",
                            width: "100%",
                          }}
                          onClick={toggleMenu}
                        >
                          Your Account
                        </b>{" "}
                        {openMenu ? (
                          <CaretUpOutlined className="arrow-user" />
                        ) : (
                          <CaretDownOutlined className="arrow-user" />
                        )}
                        {openMenu && (
                          <div className="dropdown-content p-0">
                            {user && user?.role === "admin" && (
                              <Link to="/admin/dashboard">Dashboard</Link>
                            )}
                            <Link to="/account">Account</Link>
                            <Link to="/myaccount">Profile</Link>
                            <Link to="/user/wishlist">Wishlist</Link>
                            <Link to="/user/history">History</Link>

                            <a onClick={logout}>Sign Out</a>
                          </div>
                        )}
                      </div>
                    </p>
                  </div>
                  <div className="header-login-register-section-logged">
                    <img src={starLogo} alt="Login/Register" />
                    <a
                      style={{ textDecoration: "none" }}
                      href="https://www.acehardware.com/ace-rewards"
                      target="_blank"
                    >
                      <p className="p-2 m-0">
                        <b style={{ fontWeight: "500", fontSize: "14px" }}>
                          Ace Rewards
                        </b>
                        <br />
                        <span style={{ fontSize: "14px" }}>
                          1,000/2,500 Points
                        </span>
                      </p>
                    </a>
                  </div>
                  <div className="header-login-register-section">
                    <Link
                      className="w-100 d-flex flex-row gap-1 p-0 m-0"
                      to="/cart"
                    >
                      <img
                        className="headerLogo"
                        src={cartLogo}
                        alt="Login/Register"
                      />
                      <p className="w-100 p-1 m-0">
                        <b style={{ fontWeight: "500", fontSize: "14px" }}>
                          Cart
                        </b>
                        <br />
                        <b
                          style={{ fontSize: "14px" }}
                          className="text-success"
                        >
                          {cart.length}
                        </b>{" "}
                        Items
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <Menu
                className="custom-menu-items"
                onClick={handleClick}
                selectedKeys={[currnet]}
                mode="horizontal"
              >
                <Dropdown
                  menu={{
                    items,
                  }}
                >
                  <Link
                    className="cascader"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space>Departments</Space>
                  </Link>
                </Dropdown>

                <a
                  title="Local Ad"
                  className="cascader"
                  href="https://www.acehardware.com/local-ad"
                >
                  <Space>Local Ad</Space>
                </a>
                <a
                  className="cascader"
                  href="https://www.acehardware.com/thepaintstudio"
                >
                  <Space>The Paint Studio</Space>
                </a>
                <a
                  title="Ace Project Place"
                  className="cascader"
                  href="https://www.acehardware.com/aceprojectplace"
                >
                  <Space>Ace Project Place</Space>
                </a>
                <a
                  title="Ace Handyman Services"
                  className="cascader"
                  href="https://www.acehandymanservices.com/?utm_source=acehardware.com&utm_medium=referral&utm_campaign=header_link&source=ace_site"
                >
                  <Space>Ace Handyman Services</Space>
                </a>
              </Menu>
            </div>
          )}
        </div>
        {/* Loaction header user - logged */}
        <div className="location-header-section w-100 p-1 m-0">
          <img
            src={location}
            id="location-img"
            style={{
              width: "30px",
              height: "35px",
              padding: "0px",
              marginLeft: "50px",
              marginTop: "2px",
              marginBottom: "1%",
            }}
            alt="Location"
          />

          <div className="location-container p-0 m-0">
            <div className="location-content p-0 m-0 d-flex">
              <div className="location-text p-0 m-1 d-flex">
                <div className="p-0 m-0">
                  <Link style={{ textDecoration: "none" }} to="/store-details">
                    <p>You're shopping</p>
                  </Link>
                </div>
                <div className="p-0 m-0">
                  <p>
                    <Storetime /> |{" "}
                    <div
                      style={{ cursor: "pointer" }}
                      title="Store info & Directions"
                      className="dropdown-containerr"
                    >
                      <b onClick={toggleMenu2}>Store Info & Directions</b>{" "}
                      {openMenu2 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                      {openMenu2 && (
                        <div className="dropdown-contentt">
                          <div className="store-dropdown d-flex flex-row justify-content-between bg-white">
                            <div className="drop-content d-flex flex-column m-0 p-0">
                              <MapContainer
                                center={[45.18047, -67.28653]}
                                zoom={13}
                                style={{ height: "400px", width: "100%" }}
                              >
                                <TileLayer
                                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker
                                  position={[45.18047, -67.28653]}
                                ></Marker>
                              </MapContainer>
                              <Link
                                style={{ width: "100%", textAlign: "center" }}
                                to="/Location"
                              >
                                <button
                                  className="details"
                                  style={{
                                    width: "100%",
                                    marginTop: "2px",
                                    padding: "2%",
                                    border: "1px solid grey",
                                    backgroundColor: "white",
                                  }}
                                >
                                  Get Directions
                                </button>
                              </Link>
                            </div>
                            <div className="drop-content justify-content-between d-flex flex-column m-0 p-0">
                              <img src={acestore} alt="Ace Store" />
                              <Link
                                style={{ width: "100%", textAlign: "center" }}
                                to="/store-details"
                              >
                                <button
                                  className="details"
                                  style={{
                                    width: "100%",
                                    marginTop: "2px",
                                    padding: "2%",
                                    border: "1px solid grey",
                                    backgroundColor: "white",
                                  }}
                                >
                                  Full store details
                                </button>
                              </Link>
                            </div>
                            <div className="drop-content-contact justify-content-between align-text-start d-flex flex-column gap-3 m-0 p-0">
                              <div className="p-0 m-0 w-100 d-flex flex-column">
                                <b className="p-0 m-0">
                                  Calais Ace Home Center
                                </b>
                                <p className="p-0 m-0">295 North St</p>
                                <p className="p-0 m-0">Calais, ME 04619</p>
                              </div>
                              <div className="p-0 m-0 w-100 d-flex flex-column">
                                <p className="p-0 m-0">
                                  Mon - Fri 7:00am - 6:00pm
                                </p>
                                <p className="p-0 m-0">Sat 8:00am - 5:00pm</p>
                                <p className="p-0 m-0">Sun 9:00am - 4:00pm</p>
                              </div>
                              <div className="pb-5 m-0 w-100 d-flex flex-column">
                                <p className="p-0 m-0">Phone: (207) 454-2309</p>
                                <p className="p-0 m-0">
                                  Email address: contactus@calaisace.com
                                </p>
                                <p className="p-0 m-0">Owner: Drew Case</p>
                                <p className="p-0 m-0">Manager: Drew Case</p>
                              </div>
                            </div>
                            <div className="rewards align-items-center d-flex flex-column m-0">
                              <img
                                style={{ margin: "auto" }}
                                src={acerewards}
                                alt="Ace Rewards"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>{" "}
                    | {"  "}
                    <div
                      style={{ cursor: "pointer" }}
                      className="dropdown-container"
                      title="Services & Brands"
                    >
                      <b onClick={toggleMenu3}>Services & Brands</b>{" "}
                      {openMenu3 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                      {openMenu3 && (
                        <div className="dropdown-contenttt">
                          <div className="store-dropdownn d-flex flex-row justify-content-between bg-white">
                            <div className="drop-contentt justify-content-between d-flex flex-column m-0 p-0">
                              <div className="p-0 m-0 w-100 d-flex flex-column">
                                <b
                                  style={{ fontSize: "18px" }}
                                  className="p-0 m-0"
                                >
                                  Store Services
                                </b>
                                <img
                                  src={ace_services}
                                  style={{ width: "80%" }}
                                />
                              </div>
                            </div>
                            <div className="drop-contentt justify-content-between d-flex flex-column m-0 p-0">
                              <div className="p-0 m-0 w-100 d-flex flex-column">
                                <img
                                  src={ace_services2}
                                  style={{ width: "70%", marginTop: "10%" }}
                                />
                              </div>
                            </div>
                            <div className="drop-contentt justify-content-between d-flex flex-column m-0 p-0">
                              <div className="p-0 m-0 w-100 d-flex flex-column">
                                <b
                                  style={{ fontSize: "18px" }}
                                  className="p-0 m-0"
                                >
                                  Featured Brands
                                </b>
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 m-0"
                                >
                                  KeyStart
                                </p>
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 m-0"
                                >
                                  LARSON
                                </p>
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 m-0"
                                >
                                  BLACK+DECKER
                                </p>
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 m-0"
                                >
                                  DEWALT
                                </p>
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 m-0"
                                >
                                  Craftsman
                                </p>
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 m-0"
                                >
                                  Amy Howard
                                </p>
                              </div>
                            </div>
                            <div className="drop-content-contact justify-content-between align-text-start d-flex flex-column gap-3 m-0 p-0">
                              <div className="p-0 m-0 w-100 d-flex flex-column">
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 mt-4"
                                >
                                  Scotts
                                </p>
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 m-0"
                                >
                                  ThermaTru Doors
                                </p>
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 m-0"
                                >
                                  Toro
                                </p>
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 m-0"
                                >
                                  Parcel Depot
                                </p>
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 m-0"
                                >
                                  Clark+Kensington
                                </p>
                                <p
                                  style={{ fontSize: "17px" }}
                                  className="p-0 m-0"
                                >
                                  Benjamin Moore
                                </p>
                              </div>
                            </div>
                            <div className="rewardss align-items-center d-flex flex-column m-0">
                              <Link
                                style={{ width: "100%", textAlign: "center" }}
                                to="/store-details"
                              >
                                <button
                                  className="details"
                                  style={{
                                    width: "100%",
                                    marginTop: "2px",
                                    padding: "2%",
                                    border: "1px solid grey",
                                    backgroundColor: "white",
                                  }}
                                >
                                  Full store details
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>{" "}
                    |{" "}
                    <Link to="/location">
                      <u
                        style={{
                          fontSize: "14px",
                          marginLeft: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Change store
                      </u>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
