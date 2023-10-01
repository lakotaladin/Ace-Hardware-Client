import React, { useState } from "react";
import { Card, Col, Tooltip } from "antd"; // Dodali smo Col komponentu za Bootstrap grid
import defaultImage from "../../resources/default.jpg";
import { Link } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { showAverage } from "../../functions/rating";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const ProductCard = ({ product }) => {
  // destructure
  const { title, price, images, slug } = product;
  const [hovered, setHovered] = useState(false);
  const [tooltipwish, setTooltipwish] = useState("Click to add in Wishlist");

  // redux
  const { user } = useSelector((state) => ({ ...state }));
  // router
  let history = useHistory();

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      setTooltipwish("Added");
      toast.success("Added to wishlist");
    });
    history.push("/user/wishlist");
  };

  return (
    <Col className="p-0" xs={24} sm={12} md={8} lg={8} xl={8}>
      {" "}
      <Card
        style={{
          width: "350px",
          margin: "0%",
          border: "none",
          borderBottom: "1px solid #ccc",
          paddingBottom: "5px", // Smanjili smo padding za bolje povezivanje linija
          borderRadius: "0",
          height: "455px", // Postavili smo fiksnu visinu za kartice
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center"></div>

          <div style={{ position: "relative" }}>
            <a onClick={handleAddToWishlist}>
              <Tooltip title={tooltipwish}>
                <HeartOutlined
                  style={{
                    position: "absolute",
                    fontSize: "22px",
                    color: "#ACACAC",
                    borderRadius: "50%",
                    padding: "5px 0px",
                  }}
                />
              </Tooltip>
            </a>
          </div>
        </div>
        <div className="productdiv w-100 m-auto p-0 m-0 ">
          <Link
            className="p-0 m-0 d-flex justify-content-center"
            to={`/product/${slug}`}
          >
            <img
              alt="Product"
              src={
                images && images.length
                  ? hovered
                    ? images[1].url
                    : images[0].url
                  : defaultImage
              }
              style={{
                width: "90%",
                height: "200px",
                objectFit: "scale-down",
                transition: "transform 0.1s ease-in-out",
              }}
              onMouseEnter={() => defaultImage && setHovered(true)}
              onMouseLeave={() => defaultImage && setHovered(false)}
            />
          </Link>
        </div>
        <div className="title w-100 p-0 m-0">
          <p style={{ fontSize: "16px" }} className="w-100 p-0 m-0 ">
            {title}
          </p>
        </div>
        <div
          style={{ textAlign: "start" }}
          className="description-card w-100 p-0 m-0 d-flex flex-column"
        >
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <div className="d-flex w-100 p-0 m-0">
              <i>No rating yet</i>{" "}
            </div>
          )}
          <b style={{ fontSize: "18px" }} className="w-100 p-0 m-0 ">
            &#x24; {price}
          </b>
        </div>
      </Card>
    </Col>
  );
};

export default ProductCard;
