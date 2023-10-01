import React, { useEffect, useState } from "react";
import "./layoutPage.css";
import { Breadcrumb, Layout, Space } from "antd";
import Header from "../nav/Header";
import Footer from "../footer/Footer";
import ScrollToTopButton from "../ScrollOnTop/ScrollOnTopButton";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Collapsediv from "./Collapsediv";
import { getProductsByCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";

const { Sider, Content } = Layout;
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  backgroundColor: "white",
};
const siderStyle = {
  padding: "0.5%",
  backgroundColor: "white",
};

const LayoutPage = () => {
  const links = ["Link 1", "Link 2", "Link 3"];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(10).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  return (
    <>
      <div className="countainer-fluid d-flex flex-column global p-0 m-0 d-flex">
        <Header />
        <Space
          className="gap-3"
          direction="vertical"
          style={{
            width: "100%",
          }}
          size={[0, 48]}
        >
          <div className="header-bottom d-flex flex-column p-0 m-0">
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
              <Breadcrumb.Item>Product</Breadcrumb.Item>
            </Breadcrumb>
            <div className="page-title d-flex flex-row  justify-content-between p-0 m-0">
              <h2 className="mt-3">Items ({products.length} Found)</h2>
              <div className="recommended d-flex flex-row align-items-center p-0 m-0">
                <p style={{ fontSize: "14px" }} className="p-0 m-0">
                  Sort by
                </p>
                <select
                  style={{ marginLeft: "2%" }}
                  data-mz-value="sortBy"
                  className="category-dropdown-arrow p-2 w-75"
                  autocomplete="off"
                >
                  <option data-mz-url="?" value="" selected="selected">
                    {" "}
                    Recommended
                  </option>
                  <option
                    data-mz-url="?sortBy=tenant%7eweighted-rating+desc"
                    value="tenant~weighted-rating desc"
                  >
                    Top Rated
                  </option>
                  <option data-mz-url="?sortBy=price+asc" value="price asc">
                    {" "}
                    Price: Low to High
                  </option>
                  <option data-mz-url="?sortBy=price+desc" value="price desc">
                    {" "}
                    Price: High to Low
                  </option>
                  <option
                    data-mz-url="?sortBy=productName+asc"
                    value="productName asc"
                  >
                    {" "}
                    Alphabetical: A-Z
                  </option>
                  <option
                    data-mz-url="?sortBy=productName+desc"
                    value="productName desc"
                  >
                    {" "}
                    Alphabetical: Z-A
                  </option>
                  <option
                    data-mz-url="?sortBy=createDate+desc"
                    value="createDate desc"
                  >
                    {" "}
                    Date Added: Most Recent First
                  </option>
                  <option
                    data-mz-url="?sortBy=createDate+asc"
                    value="createDate asc"
                  >
                    {" "}
                    Date Added: Most Recent Last
                  </option>
                </select>
              </div>
            </div>
          </div>
          <Layout
            style={{
              height: "auto",
              width: "80%",
              margin: "auto",
              backgroundColor: "white",
              overflowX: "hidden",
            }}
          >
            <Layout style={{ marginBottom: "5%" }} hasSider>
              <Sider width="20%" style={siderStyle}>
                <Collapsediv title="Naslov Div-a" links={links} />
              </Sider>
              <Content style={contentStyle}>
                {loading ? (
                  <LoadingCard count={3} />
                ) : (
                  <div className="row w-100 p-0 m-0">
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                )}
              </Content>
            </Layout>
          </Layout>
          <Footer />
        </Space>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default LayoutPage;
