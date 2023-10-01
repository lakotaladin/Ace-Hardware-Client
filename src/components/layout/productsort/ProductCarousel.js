import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../../functions/product";
import ProductCard from "../../cards/ProductCard";
import LoadingCard from "../../cards/LoadingCard";
import { Carousel } from "antd";

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const pageSize = 3; // Broj proizvoda po stranici

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="carousel-container mb-5">
            <Carousel
              autoplay
              infinite
              dots={true}
              dotPosition="bottom"
              slidesToShow={3}
              slidesToScroll={1}
              className="carousel"
            >
              {products.map((product) => (
                <div key={product._id} className="carousel-item">
                  <ProductCard product={product} />
                </div>
              ))}
              {products.map((product) => (
                <div key={product._id} className="carousel-item">
                  <ProductCard product={product} />
                </div>
              ))}
              {products.map((product) => (
                <div key={product._id} className="carousel-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCarousel;
