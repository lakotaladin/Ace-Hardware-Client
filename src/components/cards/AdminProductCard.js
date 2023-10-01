import React, { useState } from "react";
import { Card } from "antd";
import defaultImage from "../../resources/default.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, price, images, slug } = product;
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      cover={
        <img
          alt="Product"
          src={
            hovered
              ? images && images.length
                ? images[1].url
                : ""
              : images && images.length
              ? images[0].url
              : defaultImage
          }
          style={{
            height: "200px",
            objectFit: "scale-down",
            transition: "transform 0.1s ease-in-out",
          }}
          className="m-2"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined
            title="Edit this product"
            style={{ transform: "scale(1.5)" }}
            className="text-warning"
          />
        </Link>,
        <DeleteOutlined
          title="Delete this product"
          style={{ transform: "scale(1.5)" }}
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`$${price}${
          description && description.substring(0, 30)
        }...`}
      />
    </Card>
  );
};

export default AdminProductCard;
