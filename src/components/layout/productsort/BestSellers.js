import React, { useEffect, useState } from "react";
import "../layout/layoutPage.css";
import { Layout, Pagination } from "antd";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";

const { Content } = Layout;
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  backgroundColor: "white",
};

const BestSellers = () => {
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
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  return (
    <>
      <Content style={contentStyle}>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <>
            <div className="row">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </Content>
      <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
        <Pagination
          current={page}
          total={(productsCount / 3) * 10} // 3 products in pagination
          onChange={(value) => setPage(value)}
        />
      </nav>
    </>
  );
};

export default BestSellers;
