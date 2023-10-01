import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import { Input, Button, Space } from "antd";
import ScrollToTopButton from "../../components/ScrollOnTop/ScrollOnTopButton";
import AdminHeader from "../../components/nav/AdminHeader";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  const handleSearch = () => {
    const filteredOrders = orders.filter(
      (order) =>
        order._id.toLowerCase().includes(searchText.toLowerCase()) ||
        order.orderStatus.toLowerCase().includes(searchText.toLowerCase())
    );

    setOrders(filteredOrders);
  };

  const handleResetSearch = () => {
    setSearchText("");
    loadOrders();
  };

  return (
    <div className="dashcontainer container-fluid p-0 m-0">
      <AdminHeader />
      <div className="adminnav row">
        <div className="admincol col-md-2">
          <AdminNav />
        </div>

        <div
          style={{ overflowX: "scroll", height: "100vh" }}
          className="admdiv col-md-10"
        >
          <h2 className="mt-3">Admin Dashboard</h2>
          Total orders: {orders.length}
          <Space
            direction="horizontal d-flex flex-wrap justify-content-end p-3"
            className="mb-4"
          >
            <Input
              style={{
                border: "1px solid grey",
                width: "350px",
                borderRadius: "0px",
              }}
              className="searchadmin mb-2 p-2"
              placeholder="Search for Status or ID"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              allowClear
              autoFocus
            />
            <Space className="mb-2 pr-4" style={{ justifyContent: "center" }}>
              <Button
                className="dashbtn btn p-0"
                style={{
                  color: "white",
                  backgroundColor: "#E52538",
                  textAlign: "center",
                  alignItems: "center",
                  padding: "1%",
                  height: "40px",
                  width: "100px",
                  borderRadius: "0px",
                }}
                type="search btn"
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button
                style={{
                  height: "40px",
                  borderRadius: "0px",
                }}
                onClick={handleResetSearch}
              >
                Reset search
              </Button>
            </Space>
          </Space>
          <div
            style={{ width: "1200px" }}
            className="showordersdiv p-0 m-0 m-auto"
          >
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default AdminDashboard;
