import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";
import { toast } from "react-toastify";
import Header from "../components/nav/Header";
import Footer from "../components/footer/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Collapse } from "antd";
import acecoupon from "../resources/acecoupon.png";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import ButttonLoader from "../components/Spinners/ButttonLoader";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingforcoupon, setLoadingcoupon] = useState(false);
  const [loadingforempty, setLoadingempty] = useState(false);
  const [total, setTotal] = useState(0);
  const [address, setAdress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [expandIconPosition, setExpandIconPosition] = useState("end");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    setLoading(true);
    setLoadingcoupon(true);
    setLoadingempty(true);
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data?.products);
      setTotal(res.data.cartTotal);
      setLoading(false);
      setLoadingcoupon(false);
      setLoadingempty(false);
    });
  }, []);

  const { Panel } = Collapse;
  const emptyCart = () => {
    setLoading(true);
    setLoadingcoupon(true);
    setLoadingempty(true);
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user?.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
    setLoading(false);
    setLoadingcoupon(false);
    setLoadingempty(false);
  };

  const saveAddressToDb = () => {
    setLoading(true);
    setLoadingcoupon(true);
    setLoadingempty(true);
    saveUserAddress(user?.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address is saved");
      }
    });
    setLoading(false);
    setLoadingcoupon(false);
    setLoadingempty(false);
  };

  const applyDiscountCoupon = () => {
    setLoading(true);
    setLoadingcoupon(true);
    setLoadingempty(true);
    // console.log("send coupon to backend", coupon);
    applyCoupon(user?.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
    setLoading(false);
    setLoadingcoupon(false);
    setLoadingempty(false);
  };

  const showApplyCoupon = () => (
    <>
      <Collapse className="w-25">
        <Panel
          className="panel"
          showArrow={true}
          header={
            <div className="coup d-flex flex-row align-items-center gap-3 p-0 m-0">
              <img
                src={acecoupon}
                style={{ width: "60px", height: "25px" }}
                alt="Ace Coupon"
              ></img>
              <b
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "1px",
                }}
              >
                Reedem coupon
              </b>
            </div>
          }
          expandIconPosition={expandIconPosition}
          key="1"
        >
          <input
            onChange={(e) => {
              setCoupon(e.target.value);
              setDiscountError("");
            }}
            placeholder="Type coupon here..."
            value={coupon}
            type="text"
            className="form-control w-50"
          />
          {loading ? (
            <button
              style={{
                width: "50%",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#D30029",
              }}
              className="btn btn-primary mt-2"
            >
              <ButttonLoader />
            </button>
          ) : (
            <button
              style={{
                width: "50%",
                border: "none",
                backgroundColor: "#D30029",
              }}
              onClick={applyDiscountCoupon}
              className="btn btn-primary mt-2"
            >
              Apply
            </button>
          )}
        </Panel>
      </Collapse>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // emptu local storage
        if (typeof window != "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });

        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });

        // empty cart from database
        emptyUserCart(user.token);

        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: "#EEEE",
          height: "auto",
        }}
        className="checkoutdiv w-100 p-2 pb-5 d-flex flex-column gap-3 justify-content-center"
      >
        <div
          style={{ width: "80%" }}
          className="col-md-6  m-auto mt-4 mb-4 p-3 rounded bg-white"
        >
          <h3 style={{ color: "#D30029" }}>Delivery Address</h3>
          <hr className="w-25" />
          <i>* required input</i>
          <br />
          <br />
          <label className="m-0 mb-2">*Type your Adress:</label>
          <ReactQuill
            theme="snow"
            className="quill w-50 mb-3"
            value={address}
            onChange={setAdress}
          />
          {loadingforcoupon ? (
            <button
              style={{
                width: "20%",
                border: "none",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                fontSize: "15px",
                backgroundColor: "#D30029",
              }}
              className=" text-white rounded p-2 mt-2"
            >
              <ButttonLoader />
            </button>
          ) : (
            <button
              style={{
                width: "20%",
                border: "none",
                letterSpacing: "2px",
                fontSize: "15px",
                backgroundColor: "#D30029",
              }}
              className=" text-white btn rounded d-flex text-align-center justify-content-center p-3 mt-2"
              onClick={saveAddressToDb}
            >
              Save
            </button>
          )}
          <hr className="w-50" />
          {/* <h4>Got Coupon?</h4> */}
          <br />
          {showApplyCoupon()}
          <br />
          {discountError && <p className="text-danger p-2">{discountError}</p>}
        </div>

        <div
          style={{ width: "80%" }}
          className="col-md-6 m-auto mt-0 p-3 rounded bg-white"
        >
          <h4>Order Summary</h4>
          <hr className="w-25" />
          <p>
            Number of products in cart: <b>{products.length}</b>
          </p>
          <hr className="w-25" />
          {products.map((p, i) => (
            <div key={i}>
              <p>
                {p.product.title} ({p.color}) x {p.count} ={" "}
                {p.product.price * p.count}
              </p>
            </div>
          ))}
          <hr className="w-50" />
          <p style={{ fontSize: "18px" }}>
            <b>Cart Total: &#x24; {total}</b>
          </p>
          {/* Give discount on total if user use coupon */}
          {totalAfterDiscount > 0 && (
            <p
              style={{ fontSize: "18px" }}
              className="bg-success rounded text-white mt-2 mb-4 p-2"
            >
              Discount applied, your total price is:{" "}
              <b style={{ fontSize: "22px", fontWeight: "bold" }}>
                &#x24; {totalAfterDiscount}
              </b>
            </p>
          )}

          <div className="row">
            <div className="col-md-6 p-2">
              {COD ? (
                <button
                  style={{
                    width: "30%",
                    border: "none",
                    display: "flex",
                    letterSpacing: "1px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  disabled={!addressSaved || !products.length}
                  onClick={createCashOrder}
                  className="placeorder rounded btn border-0 bg-warning text-white p-3"
                >
                  Place order
                </button>
              ) : (
                <button
                  style={{
                    width: "30%",
                    border: "none",
                    letterSpacing: "2px",
                    fontSize: "16px",
                  }}
                  disabled={!addressSaved || !products.length}
                  className="placeorder btn rounded border-0 bg-warning text-white p-3"
                  onClick={() => history.push("/payment")}
                >
                  <CheckOutlined
                    style={{ transform: "scale(1.2)", paddingRight: "5px" }}
                  />
                  Place Order
                </button>
              )}
            </div>

            <div className="col-md-6 mb-4 p-3">
              {loadingforempty ? (
                <button
                  style={{
                    width: "20%",
                    border: "none",
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#D30029",
                  }}
                  disabled={!products.length}
                  className="empty rounded border-0 text-white p-2"
                >
                  <ButttonLoader />
                </button>
              ) : (
                <button
                  style={{
                    width: "20%",
                    border: "none",
                    backgroundColor: "#D30029",
                  }}
                  disabled={!products.length}
                  onClick={emptyCart}
                  className="empty btn rounded border-0 text-white p-2"
                >
                  <DeleteOutlined
                    style={{ transform: "scale(1.3)", paddingRight: "3px" }}
                  />{" "}
                  Empty Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
