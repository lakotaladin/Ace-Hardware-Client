import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();

  const handleModal = () => {
    if (user && user?.token) {
      setModalVisible(true);
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? (
          <p style={{ cursor: "pointer" }}>Leave rating</p>
        ) : (
          <Link
            to="/login"
            title="Login to leave rating, click here."
            style={{ color: "black" }}
          >
            Login to leave rating
          </Link>
        )}
      </div>
      <Modal
        title="Leave your rating"
        centered
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review. It will apper soon");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
