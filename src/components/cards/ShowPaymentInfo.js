import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div className="w-100">
    <p>
      Order Id:{"  "}
      <span style={{ fontWeight: "500", color: "#D40029" }}>
        {order.paymentIntent.id}
      </span>
      {" / "}
      Amount:{" "}
      <span style={{ fontWeight: "500", color: "#D40029" }}>
        {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      {" / "}
      Currency:{" "}
      <span style={{ fontWeight: "500", color: "#D40029" }}>
        {order.paymentIntent.currency.toUpperCase()}
      </span>
      {" / "}
      Method:{" "}
      <span style={{ fontWeight: "500", color: "#D40029" }}>
        {order.paymentIntent.payment_method_types[0]}
      </span>
      {" / "}
      Payment:{" "}
      <span style={{ fontWeight: "500", color: "#D40029" }}>
        {order.paymentIntent.status.toUpperCase()}
      </span>
      {" / "}
      Orderd on:{" "}
      <span style={{ fontWeight: "500", color: "#D40029" }}>
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "}
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
