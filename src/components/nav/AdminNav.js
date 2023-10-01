import React from "react";
import "../nav/AdminNav.css";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav className="adminnavigation m-0 d-flex">
    <ul style={{ fontSize: "18px" }} className="nav d-flex flex-column">
      <li className="nav-item">
        <Link
          to="/admin/dashboard"
          style={{ color: "black" }}
          className="nav-link"
        >
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/admin/product"
          style={{ color: "black" }}
          className="nav-link"
        >
          Product create
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/admin/products"
          style={{ color: "black" }}
          className="nav-link"
        >
          All products
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/admin/category"
          style={{ color: "black" }}
          className="nav-link"
        >
          Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" style={{ color: "black" }} className="nav-link">
          Sub Category
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/admin/coupon"
          style={{ color: "black" }}
          className="nav-link"
        >
          Create coupon
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
