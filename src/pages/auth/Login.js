import React, { useState, useEffect } from "react";
import "./login.css";
import { auth } from "../../firebase";
import "firebase/compat/firestore";
import { createOrUpdateUser } from "../../functions/auth";
import { toast } from "react-toastify";
import ForgotPasswordModal from "../../components/ForgotPasswordModal/ForgotPasswordModal";
import aceLogo from "../../resources/ace_logo.png";
import arrow from "../../resources/arrow.png";
import phone from "../../resources/phone.png";
import mail from "../../resources/mail.png";
import { Link } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";



const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user?.token) window.location.href = "/";
    }
  }, [user, history]);

  let dispatch = useDispatch();
  const roleBasedRedirect = (res) => {
    // Check if intended
    let intended = history.location.state;
    if (intended) {
      window.location.href = intended.from;
    } else {
      if (res.data.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user?.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="global-login w-100 p-0 m-0">
        <div className="navigation-login justify-content-center w-100 p-4 m-0 d-flex flex-row">
          <div className="nav-container d-flex p-0">
            <div className="back-div gap-1 d-flex p-0 m-0 flex-row align-items-center">
              <Link to="/" className="link-arrow p-0 m-0">
                <img src={arrow} alt="Arrow" className="arrow-back" />
              </Link>
              <Link to="/" className="link-arrow p-0">
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

        {/* Section login */}
        {/* {loading ? ( */}
        <div className="section-global w-100 m-0 p-0 d-flex">
          <div className="form-container p-0 d-flex flex-column">
            <form
              onSubmit={handleSubmit}
              className="form w-100 m-0 d-flex flex-column"
            >
              <h6
                style={{
                  color: "#D40029",
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                Sign In
              </h6>
              <p
                style={{ fontSize: "14px", marginBottom: "15px" }}
                className="p-0"
              >
                Sign in to access your account and Ace Rewards.
              </p>
              <input
                className="input-form"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              ></input>
              <input
                className="input-form"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
              ></input>
              <span
                onClick={openModal}
                // to="/forgotten-password"
                className="fogotten-password-link p-0 m-0"
              >
                Forgot Password
              </span>

              <div className="button-form btn m-0 p-0 w-100 d-flex justify-content-center align-items-center">
                <button
                  type="submit"
                  className="button w-100 mt-4"
                  disabled={!email || password.length < 6}
                >
                  Sign In
                </button>
              </div>
            </form>
            {/* Create account */}
            <div className="account-container w-100 d-flex flex-column m-0">
              <h6
                style={{
                  marginTop: "15%",
                  fontSize: "20px",
                  fontWeight: "400",
                }}
              >
                New to Ace online?
              </h6>
              <p
                style={{ fontSize: "14px", marginBottom: "15px" }}
                className="p-0"
              >
                Create an account and join Ace Rewards for:
              </p>
              <div className="check-text d-flex flex-row gap-2 p-0 w-100">
                <CheckOutlined />{" "}
                <p style={{ fontSize: "12px" }} className="p-0 ">
                  Free delivery from store with qualifying online purchases of
                  $50 or more.
                </p>
              </div>
              <div className="check-text d-flex gap-2  p-0 w-100">
                <CheckOutlined />
                <p style={{ fontSize: "12px" }} className="p-0 m-0">
                  Exclusive offers and instant savings.
                </p>
              </div>
              <div className="check-text d-flex gap-2 p-0 w-100">
                <CheckOutlined />
                <p style={{ fontSize: "12px" }} className="p-0 ">
                  $5 reward earned every 2,500 points.
                </p>
              </div>
              <p
                style={{ fontSize: "12px", marginBottom: "15px" }}
                className="p-0"
              >
                If you’ve already signed up for Ace Rewards, we’ll link your
                <br />
                accounts when you create your online account.
              </p>
              <div className="m-0 p-0 w-100 d-flex flex-column justify-content-center align-items-center">
                <Link to="/register" className="w-100 p-0 m-0">
                  <button type="submit" className="button-account w-100">
                    Create Account
                  </button>
                </Link>
                <p
                  style={{
                    fontSize: "12px",
                    marginBottom: "15px",
                    marginTop: "10px",
                  }}
                  className="p-0"
                >
                  Note: joining Ace Rewards or linking accounts is optional (but
                  why not, it’s free!)
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ) : (
          <h1 className="text-danger">Loading...</h1>
        )} */}
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
        {/* Renderiranje ForgotPasswordModal */}
        <ForgotPasswordModal visible={isModalVisible} onClose={closeModal} />
      </div>
    </>
  );
};

export default Login;
