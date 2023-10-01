import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import LoadingCard from "../../../components/cards/LoadingCard";
import { toast } from "react-toastify";
import AdminHeader from "../../../components/nav/AdminHeader";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product._id.toString().includes(searchTerm)
      );
    });
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm("Are you sure to delete this product?")) {
      removeProduct(slug, user?.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <>
      <AdminHeader />
      <div
        style={{ height: "100%" }}
        className=" p-0 m-0 w-100 container-fluid d-flex flex-row"
      >
        <div style={{ height: "200vh", width: "18%" }} className="p-0 m-0">
          <AdminNav />
        </div>
        <div className="allproducts row w-100 p-4">
          <div className="col">
            {loading ? (
              <LoadingCard />
            ) : (
              <>
                <div className="d-flex justify-content-between mb-4 align-items-center">
                  <h2>All Products ({filteredProducts.length} Items)</h2>
                  <Search
                    placeholder="Search by title or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 500, borderRadius: 0 }}
                    enterButton={
                      <Button
                        style={{ backgroundColor: "#E52538", width: 70 }}
                        type="primary"
                        shape="circle"
                        icon={<SearchOutlined />}
                      />
                    }
                    allowClear
                    autoFocus
                  />
                </div>
              </>
            )}
            <div className="row w-100">
              {filteredProducts.map((product) => (
                <div key={product._id} className="col-md-4 pb-3">
                  <AdminProductCard
                    product={product}
                    handleRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
