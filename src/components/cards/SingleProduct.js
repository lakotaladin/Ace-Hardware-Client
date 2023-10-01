import React, { useState } from "react";
import "./singleProductStyle.css";
import pplogo from "../../resources/pp-logo.png";
import StarRating from "react-star-ratings";
import instock from "../../resources/instock.png";
import addtowish from "../../resources/addtowish.png";
import defaultimg from "../../resources/default.jpg";
import { Card, Col, Row, Tooltip } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  ExclamationCircleFilled,
  MailOutlined,
  RightOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import RatingModal from "../modalRating/RatingModal";
import { showAverage } from "../../functions/rating";
import { addToWishlist } from "../../functions/user";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import ButtonLoader from "../Spinners/ButttonLoader";
import { useHistory } from "react-router-dom";

// This is children component of /page/Product.js page
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, _id, price, images, quantity } = product;
  const [loading, setLoading] = useState(false);

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  // router
  let history = useHistory();

  // Check product quantity
  const isQuantityAvailable = quantity > 0;

  // Tooltip
  const [tooltip, setTooltip] = useState("Click to add in card");
  const [tooltipwish, setTooltipwish] = useState("Click to add in Wishlist");

  // Handle add to card
  const handleaddToCart = () => {
    setLoading(true);
    // cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in localstorage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart, default is 1
      cart.push({ ...product, count: 1 });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      //show tooltip
      setTooltip("Added");

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer when user click add to cart
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
    setLoading(false);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      // console.log("ADDED TO WISHLIST", res.data);
      setTooltipwish("Added in your Wishlist!");
      toast.success("Added to wishlist");
    });
  };

  return (
    <>
      <div className="w-100">
        <div className="w-100 d-flex flex-column p-0 m-0">
          <div
            style={{ margin: "auto" }}
            className="row w-100 d-flex flex-row p-1"
          >
            <div className="col-md-7">
              {images && images.length ? (
                <Carousel showArrows={true} autoPlay infiniteLoop>
                  {images &&
                    images.map((i) => (
                      <img
                        style={{ objectFit: "scale-down" }}
                        src={i.url}
                        key={i.public_id}
                      />
                    ))}
                </Carousel>
              ) : (
                <Card
                  cover={
                    <img
                      src={defaultimg}
                      className="mb-3 card-image"
                      alt="No data"
                    />
                  }
                ></Card>
              )}
            </div>
            <div className="col-md-5 d-flex flex-column product-info">
              <div className="block d-flex flex-column align-text-start p-0 m-0">
                <b style={{ fontSize: "22px" }}>{title}</b>
                <p>Item # {_id} </p>
                <b style={{ fontSize: "30px" }}> &#x24;{price}</b>
                {product && product.ratings && product.ratings.length > 0 ? (
                  showAverage(product)
                ) : (
                  <div className="d-flex w-100 p-0 m-0">
                    <i>No rating yet</i>{" "}
                  </div>
                )}
                <RatingModal>
                  <StarRating
                    name={_id}
                    numberOfStars={5}
                    rating={star}
                    changeRating={onStarClick}
                    isSelectable={true}
                    starRatedColor="#E52538"
                  />
                </RatingModal>
              </div>
              <div className="block d-flex flex-row align-text-start align-items-center p-0 m-0">
                <img
                  style={{ width: "20px", margin: "1%" }}
                  src={pplogo}
                  alt="PayPal Logo"
                />
                <p style={{ paddingTop: "3%" }}>
                  <a style={{ color: "black" }} href="#" target="_blank">
                    Make 6 payments of &#x24;83.33/mo at 0% APR.{" "}
                    <u style={{ color: "blue" }}>Learn more</u>
                  </a>
                </p>
              </div>
              <div className="block d-flex flex-column align-text-start pt-3 pb-3 m-0">
                <div className="d-flex flex-row p-0 m-0 justify-content-between">
                  <b>Get item from: </b>
                  <Link to="/location" style={{ color: "black" }}>
                    <u>Change store</u>
                    <RightOutlined style={{ transform: "scale(0.9)" }} />
                  </Link>
                </div>

                <div className="d-flex flex-row p-0 m-0">
                  <b>Calais Ace Home Center, Calais ME</b>
                </div>
                <div className="d-flex flex-row p-0 m-0">
                  {isQuantityAvailable ? (
                    <img
                      style={{ width: "100%", margin: "1%" }}
                      src={instock}
                      alt="In stock"
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#E6F2E6",
                        alignItems: "center",
                      }}
                      className="d-flex flex-row mt-2 p-2"
                    >
                      <h5 style={{ color: "red" }} className="p-0 m-0">
                        <ExclamationCircleFilled /> {""}Out of stock!
                      </h5>{" "}
                    </div>
                  )}
                </div>
              </div>
              <div className="block d-flex flex-column align-text-start p-0 m-0">
                <div className="d-flex flex-row mt-3 mb-3 justify-content-between">
                  {/* Add to card */}
                  {loading ? (
                    <Tooltip title={tooltip}>
                      <a className="w-100 p-0 m-0">
                        <button
                          style={{
                            height: "48px",
                            fontWeight: "500",
                            fontSize: "14px",
                            backgroundColor: "#d40029",
                            padding: "15px 20px",
                            lineHeight: "normal",
                            overflow: "hidden",
                            display: "inline-block",
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            letterSpacing: "1.25px",
                            boxShadow:
                              "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2);",
                            border: "none",
                            borderRadius: "4px",
                          }}
                          id="add-to-cart"
                          className="btn w-100 mz-button mz-animated-btn ace-add-to-cart-btn "
                          data-mz-action="addToCart"
                        >
                          <ButtonLoader />
                        </button>
                      </a>
                    </Tooltip>
                  ) : (
                    <Tooltip title={tooltip}>
                      <a
                        className="w-100 p-0 m-0"
                        onClick={handleaddToCart}
                        disabled={product.quantity < 1}
                      >
                        <button
                          style={{
                            height: "48px",
                            fontWeight: "500",
                            fontSize: "14px",
                            backgroundColor: "#d40029",
                            padding: "15px 20px",
                            lineHeight: "normal",
                            overflow: "hidden",
                            display: "inline-block",
                            color: "white",
                            letterSpacing: "1.25px",
                            boxShadow:
                              "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2);",
                            border: "none",
                            borderRadius: "4px",
                          }}
                          id="add-to-cart"
                          className="show-loading-animation btn w-100 mz-button mz-animated-btn ace-add-to-cart-btn "
                          data-mz-action="addToCart"
                          disabled={!isQuantityAvailable}
                        >
                          ADD TO CART
                        </button>
                      </a>
                    </Tooltip>
                  )}
                </div>
                {/* Add to wish list */}
                <Tooltip title={tooltipwish}>
                  <a
                    onClick={handleAddToWishlist}
                    style={{ margin: "1% auto " }}
                  >
                    <img
                      style={{ width: "120px", margin: "3% auto " }}
                      src={addtowish}
                      alt="Add to Wish list"
                    />
                  </a>
                </Tooltip>
                <div>
                  <Row gutter={16} justify="end">
                    <Col>
                      <a
                        href="https://twitter.com/home?status=https://www.acehardware.com/char-broil-patio-bistro-electric-grill-red/p/8269243"
                        target="_blank"
                        title="Ace Hardware Twitter"
                      >
                        <TwitterOutlined
                          style={{ fontSize: "24px", color: "#1DA1F2" }}
                        />
                      </a>
                    </Col>
                    <Col>
                      <a
                        href="mailto:hardwareace439@gmail.com "
                        target="_blank"
                        title="Ace Hardware"
                      >
                        <MailOutlined
                          style={{ fontSize: "24px", color: "#D44638" }}
                        />
                      </a>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductListItems product={product} />
      </div>
    </>
  );
};

export default SingleProduct;
