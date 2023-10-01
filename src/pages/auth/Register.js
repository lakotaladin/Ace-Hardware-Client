import React, { useEffect, useState } from "react";
import "./register.css";
import aceLogo from "../../resources/ace_logo.png";
import arrow from "../../resources/arrow.png";
import phone from "../../resources/phone.png";
import mail from "../../resources/mail.png";
import acerewards from "../../resources/register-rewards.png";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import "firebase/compat/firestore";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, Select } from "antd";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [month, setMonth] = useState("");

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const [form] = useForm();

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async () => {
    // e.preventDefault();

    try {
      let userData = {
        email: email,
        name: name,
        lastName: lastName,
        streetAddress: Address,
        phone: phoneNumber,
        phoneType: phoneType,
        month: month,
      };
      // console.log({ userData });

      const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      };

      await auth.sendSignInLinkToEmail(email, config);
      await axios.post(process.env.REACT_APP_API + "/register", userData);
      toast.success(
        `Email is sent to ${email}, Click the link to complete registration.`
      );
      window.localStorage.setItem("emailForRegistration", email);
      setEmail("");
      setLastName("");
      setphoneNumber("");
      setAddress("");
      setName("");
      setPhoneType("");
      setMonth("");
    } catch (error) {
      console.error("Error sending data to backend:", error);
      toast.error("Error sending data to backend:", error);
    }
  };

  const handleCheckbox1Change = () => {
    setCheckbox1(!checkbox1);
  };

  const handleCheckbox2Change = () => {
    setCheckbox2(!checkbox2);
  };

  const isButtonDisabled = !(checkbox1 && checkbox2);

  const registerForm = () => (
    <Form
      onFinish={handleSubmit}
      initialValues={{
        email: "",
        name: "",
        lastName: "",
        streetAddress: "",
        phone: "",
        phoneType: "",
        month: "",
      }}
      className="form-register w-100 m-0 d-flex flex-column"
    >
      <div className="email-pass-div d-flex flex-column m-0 w-100">
        <h6
          style={{
            color: "#D40029",
            fontSize: "20px",
            fontWeight: "400",
          }}
        >
          Create an account
        </h6>
        <p
          style={{
            fontSize: "14px",
            width: "400px",
            marginBottom: "15px",
          }}
          className="p-0"
        >
          Create a new online account and join Ace Rewards or link accounts
          (joining or linking is optional).
        </p>

        <label>Account sign in details</label>
        <Form.Item
          type="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Type your email!",
            },
            {
              type: "email",
              message: "Wrong email format!",
            },
          ]}
        >
          <Input
            className="input-form"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          ></Input>
        </Form.Item>
      </div>
      <div className="email-pass-div2 d-flex flex-column m-0 w-100">
        <label>About you</label>
        <Form.Item
          type="text"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name!",
            },
            {
              pattern: /^[A-Za-z\s]+$/,
              message:
                "Please enter a valid name with only letters and spaces!",
            },
            {
              min: 2,
              message: "Name must be at least 2 characters long!",
            },
            {
              max: 16,
              message: "Name cannot exceed 16 characters!",
            },
          ]}
        >
          <Input
            className="input-form"
            placeholder="Name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </Form.Item>
        <Form.Item
          type="text"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please enter your last name!",
            },
            {
              pattern: /^[A-Za-z\s]+$/,
              message:
                "Please enter a valid name with only letters and spaces!",
            },
            {
              min: 2,
              message: "Name must be at least 2 characters long!",
            },
            {
              max: 16,
              message: "Name cannot exceed 16 characters!",
            },
          ]}
        >
          <Input
            className="input-form"
            placeholder="Last Name"
            autoFocus
            onChange={(e) => setLastName(e.target.value)}
          ></Input>
        </Form.Item>
        <Form.Item
          type="text"
          name="streetAddress"
          rules={[
            {
              required: true,
              message: "Please enter your address!",
            },
            {
              pattern: /^[A-Za-z0-9\s,.\-\u0100-\u017F]+$/,
              message:
                "Please enter a valid address with letters, numbers, spaces, and common punctuation!",
            },
            {
              min: 5,
              message: "Address must be at least 5 characters long!",
            },
            {
              max: 30,
              message: "Address cannot exceed 30 characters!",
            },
          ]}
        >
          <Input
            className="input-form"
            placeholder="Street Address"
            autoFocus
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Item>
        <div className="selectInputs w-100 d-flex flex-row p-0 m-0 gap-1">
          <Form.Item
            className="w-100"
            type="phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!",
              },
              {
                pattern: /^[/^\+?[0-9]+$/,
                message:
                  "Please enter a valid phone number (only numbers and optional + sign).",
              },
              {
                min: 6,
                message: "Phone number must be at least 5 characters long!",
              },
              {
                max: 20,
                message: "Phone number cannot exceed 20 characters!",
              },
            ]}
          >
            <Input
              className="input-form  mb-0"
              placeholder="Phone Number"
              autoFocus
              required
              onChange={(e) => setphoneNumber(e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item name="phoneType">
            <Select
              onChange={(value) => setPhoneType(value)}
              style={{
                width: 120,
              }}
              allowClear
              options={[
                {
                  value: "mobile",
                  label: "Mobile",
                },
                {
                  value: "home",
                  label: "Home",
                },
                {
                  value: "bussiness",
                  label: "Business",
                },
              ]}
            />
          </Form.Item>
        </div>
        <p style={{ fontSize: "12px", margin: "0% 0% 0% 3%" }} className="p-0">
          Used to look up your account or order information.
        </p>
        <Form.Item name="month">
          <Select
            onChange={(value) => setMonth(value)}
            placeholder="Birthday (optional)"
            style={{
              width: "100%",
            }}
            allowClear
            options={[
              {
                value: "january",
                label: "January",
              },
              {
                value: "february",
                label: "February",
              },
              {
                value: "march",
                label: "March",
              },
              {
                value: "april",
                label: "April",
              },
              {
                value: "may",
                label: "May",
              },
              {
                value: "june",
                label: "June",
              },
              {
                value: "july",
                label: "July",
              },
              {
                value: "august",
                label: "August",
              },
              {
                value: "september",
                label: "September",
              },
              {
                value: "october",
                label: "October",
              },
              {
                value: "november",
                label: "November",
              },
              {
                value: "december",
                label: "December",
              },
            ]}
          />
        </Form.Item>
      </div>
      <div className="email-div3 d-flex flex-column m-0 w-100">
        <h6
          style={{
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          Sign Up for offers & tips
        </h6>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={checkbox1}
            onChange={handleCheckbox1Change}
            id="checkbox1"
          />
          <label className="form-check-label" htmlFor="exampleCheckbox">
            Email me offers and helpful tips
          </label>
        </div>
      </div>
      <img style={{ margin: "5%" }} src={acerewards} alt="Ace Rewards" />
      <div className="account-container w-100 d-flex flex-column m-0">
        <div className="button-div m-0 w-100 d-flex flex-column justify-content-center align-items-center">
          <div className="form-check">
            <input
              checked={checkbox2}
              className="form-check-input"
              type="checkbox"
              id="checkbox2"
              onChange={handleCheckbox2Change}
            />
            <label
              className="form-check-label-privacy"
              htmlFor="exampleCheckbox"
            >
              I confirm I have read and agree to the{" "}
              <a href="https://www.acehardware.com/customer-service?page=ace-rewards">
                Ace Rewards® Program Terms
              </a>
              ,
              <a href="https://www.acehardware.com/customer-service?page=privacy-policy">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://www.acehardware.com/customer-service?page=ace-rewards">
                Terms of Use.
              </a>
            </label>
          </div>
          <Button
            htmlType="submit"
            disabled={isButtonDisabled}
            className="button-account w-100"
          >
            Create Account
          </Button>
        </div>
      </div>
    </Form>
  );

  return (
    <>
      <div className="global-login w-100 p-0 m-0">
        <div className="navigation-login justify-content-center w-100 p-4 m-0 d-flex flex-row">
          <div className="nav-container d-flex p-0">
            <div className="back-div gap-1 d-flex p-0 m-0 flex-row align-items-center">
              <Link to="/" className="link-arrow p-0 m-0">
                <img src={arrow} alt="Arrow" className="arrow-back" />
              </Link>
              <Link to="/login" className="link-arrow p-0">
                <p
                  style={{
                    fontSize: "18px",
                    marginLeft: "10px",
                  }}
                  className="p-1 m-0"
                >
                  Back
                </p>
              </Link>
            </div>
            <div className="ace-logo">
              <Link to="/">
                <img style={{ width: "95px" }} src={aceLogo} alt="Ace logo" />
              </Link>
            </div>
          </div>
        </div>

        <div className="section-globall w-100 m-0 p-0 d-flex">
          <div className="form-container p-0 d-flex flex-column">
            {registerForm()}
          </div>
        </div>
      </div>
      <div className="footer w-100 p-4 d-flex flex-column">
        <div className="contact-div w-100 d-flex flex-row gap-5 p-2 text-align-center">
          <div className="help-div d-flex p-0 m-0 align-items-end">
            <h6
              style={{
                fontSize: "18px",
                margin: "0px",
                padding: "0px",
              }}
            >
              Need Help? Call or Email US!
            </h6>
          </div>

          <div className="d-flex p-0 m-0 align-items-end">
            <img style={{ marginRight: "5px" }} src={phone} alt="Phone logo" />
            <a
              href="phone: 1-888-827-4223"
              style={{
                color: "white",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              1-888-827-4223
            </a>
          </div>

          <div className="d-flex p-0 m-0 align-items-end">
            <img
              style={{
                width: "35px",
                height: "35px",
                marginBottom: "7px",
                marginRight: "8px",
              }}
              src={mail}
              alt="Mail logo"
            />
            <a
              href="mailto: acehardware@gmail.com"
              style={{
                color: "white",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              Email Us
            </a>
          </div>
        </div>
        <div className="d-flex flex-row gap-3 w-100 m-0 p-1 justify-content-center">
          <a style={{ color: "white", fontSize: "14px" }} href="#">
            Terms of Use
          </a>
          <a style={{ color: "white", fontSize: "14px" }} href="#">
            Privacy policy
          </a>
        </div>
        <div className="privacy d-flex flex-column w-100 m-0 p-1 justify-content-center">
          <p style={{ fontSize: "14px" }} className="p-0 m-2">
            © 2023 Ace Hardware. Ace Hardware and the Ace Hardware logo are
            registered trademarks of Ace Hardware Corporation. All rights
            reserved.
          </p>
          <p style={{ fontSize: "14px" }} className="p-0 m-0">
            For screen reader problems with this website, please call{" "}
            <a
              style={{ color: "white", textDecoration: "underline" }}
              href="tel:1-888-827-4223"
            >
              1-888-827-4223
            </a>{" "}
            or{"  "}
            <a
              style={{ color: "white", textDecoration: "underline" }}
              href="mailto: acehardware@gmail.com"
            >
              Email Us
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
