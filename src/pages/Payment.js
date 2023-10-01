import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="paymentglobal w-100 p-0 m-0 d-flex justify-content-center"
      >
        <div
          style={{ border: "1px solid lightgray", borderRadius: "5px" }}
          className="p-2 pt-5 mt-5 text-center w-50 margin-auto d-flex flex-column bg-white"
        >
          <h4>Complete your purchase</h4>
          <Elements stripe={promise}>
            <div className="col-md-8 offset-md-2">
              <StripeCheckout />
            </div>
          </Elements>
        </div>
      </div>
    </>
  );
};

export default Payment;
