import React, { useState, useEffect } from "react";
import "./RegisterComplete.css";
import aceLogo from "../../resources/ace_logo.png";
import arrow from "../../resources/arrow.png";
import phone from "../../resources/phone.png";
import mail from "../../resources/mail.png";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import "firebase/compat/firestore";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch();
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      toast.error("Email and password are required!");
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter (A-Z)");
    } else {
      try {
        const result = await auth.signInWithEmailLink(
          email,
          window.location.href
        );

        if (result.user?.emailVerified) {
          window.localStorage.removeItem("emailForRegistration");
          let user = auth?.currentUser;
          await user.updatePassword(password);
          const idTokenResult = await user?.getIdTokenResult();
          createOrUpdateUser(idTokenResult?.token)
            .then((res) =>
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.name,
                  lastName: res.data.lastName,
                  address: res.data.streetAddress,
                  email: res.data.email,
                  phone: res.data.phone,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                },
              })
            )
            .catch((err) => console.log(err));
          setTimeout(() => {
            history.push("/");
            toast.success("Registration is completed!");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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
              <Link to="/register" className="link-arrow p-0">
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

        <div className="section-global w-100 m-0 p-0 d-flex">
          <div className="form-container p-0 d-flex flex-column">
            <form
              style={{ height: "auto", overflow: "hidden" }}
              onSubmit={handleSubmit}
              className="form-register w-100 m-0 p-3 d-flex flex-column"
            >
              <div className="email-pass-div d-flex flex-column m-0 p-4 w-100">
                <h6
                  style={{
                    color: "#D40029",
                    fontSize: "22px",
                    fontWeight: "400",
                  }}
                >
                  Complete registration
                </h6>
                <label>Your Email:</label>
                <input
                  className="input-form"
                  placeholder="Email"
                  type="email"
                  value={email}
                  disabled
                ></input>
                <label>Type your password:</label>
                <input
                  className="input-form"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoFocus
                ></input>
              </div>

              <button
                type="submit"
                style={{ fontSize: "18px", letterSpacing: "1px" }}
                className="button-account btn mt-4 mb-4 w-100"
              >
                Submit
              </button>
            </form>
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
          <a
            style={{ color: "white", fontSize: "14px" }}
            href="https://www.acehardware.com/customer-service?page=terms-of-use"
          >
            Terms of Use
          </a>
          <a
            style={{ color: "white", fontSize: "14px" }}
            href="https://www.acehardware.com/customer-service?page=privacy-policy"
          >
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
            or{" "}
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

export default RegisterComplete;
