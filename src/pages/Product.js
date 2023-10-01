import React, { useEffect, useState } from "react";
import "./productpage.css";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import Footer from "../components/footer/Footer";
import Header from "../components/nav/Header";
import { Breadcrumb } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ScrollToTopButton from "../components/ScrollOnTop/ScrollOnTopButton";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user star
    }
  });
  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user?.token).then((res) => {
      console.log("Rating clicked", res.data);
      loadSingleProduct(); // Show updated rating in real time
    });
  };
  return (
    <>
      {/* {JSON.stringify(product)} */}
      <div className="container-fluid m-0 p-0">
        <Header />

        <div className="section-container p-0  d-flex flex-column">
          <Breadcrumb
            style={{
              height: "30px",
              margin: "0px",
              paddingTop: "1%",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Breadcrumb.Item>
              <LeftOutlined style={{ fontSize: "11px", margin: "0px" }} />
              <Link to="/" className="link">
                Ace Hardware
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
            <Breadcrumb.Item>{slug}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="row pt-4">
            <SingleProduct
              product={product}
              onStarClick={onStarClick}
              star={star}
            />
          </div>
          <div className="row w-100 d-flex flex-row m-auto mt-4">
            <h3 style={{ borderBottom: "2px solid #EEEE" }}>
              Related Products
            </h3>
          </div>
        </div>
        {/* <div
          style={{ border: "none" }}
          className="related d-flex flex-row w-100 justify-content-center pb-5"
        > */}
        <div className="w-100 d-flex flex-row p-0 m-0">
          {related.length ? (
            related.map((r, index) => (
              <div
                className={`relatedproducts justify-content-center w-100 mb-5 p-0 d-flex flex-row`}
                key={r._id}
              >
                <ProductCard product={r} />
              </div>
            ))
          ) : (
            <div className="text-center col">No Products Found</div>
          )}
        </div>
        {/* </div> */}
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Product;
