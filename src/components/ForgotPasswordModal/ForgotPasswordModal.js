import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector, userSelector } from "react-redux";
import { Modal, Input, Button, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import LoadingCardText from "../cards/LoadingCardText";

const ForgotPasswordModal = ({ history, visible, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user?.token) history.push("/");
  }, [user]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR MESSAGE IN FORGOT PASSWORD!", error.message);
      });
    onClose();
  };

  return (
    <>
      {loading ? (
        <LoadingCardText />
      ) : (
        <Modal
          className="resetmodal p-3"
          open={visible}
          centered
          onCancel={onClose}
          title={
            <b
              style={{ color: "#E51636", fontSize: "22px", fontWeight: "500" }}
            >
              Reset Password
            </b>
          }
          footer={[
            <Button
              key="send"
              className="border-0 w-100 p-1"
              type="primary"
              disabled={!email}
              onClick={handleSendEmail}
            >
              Send Email
            </Button>,
          ]}
          closeIcon={<CloseOutlined />}
        >
          <Form onFinish={handleSendEmail} autoComplete="off">
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                className="p-2 mt-4 mb-2"
                type="email"
                placeholder="Type your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ForgotPasswordModal;
