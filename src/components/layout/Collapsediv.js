import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const Collapsediv = ({ title, links }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const divStyle = {
    borderTop: "1px solid #ccc",
    overflow: "hidden",
    borderBottom: "1px solid #ccc",
    padding: "2%",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "bold",
    cursor: "pointer",
    padding: "1px 0",
  };

  const titleStyle = {
    marginRight: "auto",
    lineheight: "unset !important",
  };

  const linkStyle = {
    display: isCollapsed ? "none" : "block",
    padding: "0px",
    textAlign: "start",
    textDecoration: "none",
    color: "red",
  };

  const plusminus = {
    color: "#D40029",
  };

  return (
    <div style={divStyle}>
      <div style={headerStyle} onClick={toggleCollapse}>
        <span style={titleStyle}>{title}</span>
        {isCollapsed ? (
          <PlusOutlined style={plusminus} />
        ) : (
          <MinusOutlined style={plusminus} />
        )}
      </div>
      <div>
        {links.map((link, index) => (
          <Link to="#" key={index} style={linkStyle}>
            {link}
          </Link>
        ))}
      </div>
      <div style={{ marginTop: "5px" }}></div>
    </div>
  );
};

export default Collapsediv;
