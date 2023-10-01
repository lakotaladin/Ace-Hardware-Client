import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import defaultimg from "../../resources/default.jpg";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100%",
    height: "50px",
    objectFit: "cover",
  };

  return (
    <Drawer
      className="text-start"
      title={`Added to cart (${cart.length})`}
      placement="right"
      closable={false}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      open={drawer}
      width={400} // Povećajte širinu drawera na željeni broj piksela
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} alt={p.title} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <img src={defaultimg} style={imageStyle} alt="Default" />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      <div className="buttons d-flex flex-column w-100 p-0 m-0">
        <button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            fontSize: "15px",
          }}
          className="text-center rounded pt-3 pb-3 btn-block mb-2"
        >
          Continue Shopping
        </button>

        <Link className="p-0 m-0" to="/cart">
          <button
            style={{ fontSize: "15px", backgroundColor: "#D40029" }}
            onClick={() =>
              dispatch({
                type: "SET_VISIBLE",
                payload: false,
              })
            }
            className="text-center text-white rounded pt-3 pb-3 border-0 btn-block"
          >
            View cart & Checkout
          </button>
        </Link>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
