import React from "react";
import "../footer/footer.css";
import light from "../../resources/light_logo.png";
import axe from "../../resources/axe_logo.png";
import aw from "../../resources/aw_logo.png";
import fb from "../../resources/fb.png";
import inst from "../../resources/insta.png";
import twit from "../../resources/twiter.png";
import pint from "../../resources/pint.png";
import yt from "../../resources/yt.png";
import privacy from "../../resources/privacy.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Footer = () => {
  return (
    <>
      <div className="footer-global d-flex w-100 m-0">
        <div className="footer-container-one m-0 w-100">
          <div className="footer-card d-flex m-0">
            <h5>More Ways to Shop</h5>
            <Link to="/Location">Store Locator</Link>
            <a href="#">Shop Our Ad</a>
            <a href="#">Brands We Love</a>
            <a href="#">The Print Studio</a>
            <a href="#">Store Directory</a>
            <a href="#">Gift Cards</a>
            <a href="#">Ace Coupons</a>
            <a href="#">Mobile App</a>
          </div>
          {/* Card 2 */}
          <div className="footer-card d-flex m-0">
            <h5>Customer Service</h5>
            <a href="#">Contact Us</a>
            <a href="#">Track Your Order</a>
            <a href="#">Easy Returns</a>
            <a href="#">Shipping, Pickup & Delivery</a>
            <a href="#">Online Security & Safety</a>
            <a href="#">Product Recalls</a>
          </div>
          {/* Card 3 */}
          <div className="footer-card d-flex m-0">
            <h5>About Ace</h5>
            <a href="#">Contact Us</a>
            <a href="#">Track Your Order</a>
            <a href="#">Easy Returns</a>
            <a href="#">Shipping, Pickup & Delivery</a>
            <a href="#">Online Security & Safety</a>
            <a href="#">Product Recalls</a>
          </div>
          {/* Card 4 */}
          <div className="footer-card d-flex m-0">
            <h5>Resources</h5>
            <a href="#">Tips & Advice</a>
            <a href="#">Sales & Specials</a>
            <a href="#">Store Services</a>
            <a href="#">Newsroom</a>
            <a href="#">Neighborhood News</a>
            <a href="#">Annual Report</a>
            <a href="#">Ace Handyman Services</a>
          </div>
          {/* Card 5 */}
          <div className="footer-card-award d-flex m-0 p-0">
            {/* <img className="" src={acerewards} alt="Ace Rewards" /> */}
            <div className="links-footer-award p-0 m-0">
              <u>
                <a
                  className="learn-more-link"
                  href="https://www.acehardware.com/ace-rewards"
                >
                  Learn More
                </a>
              </u>{" "}
              <u>
                <a
                  className="join-now-link"
                  href="https://www.acehardware.com/ace-rewards"
                >
                  Join now
                </a>
              </u>
            </div>
          </div>
        </div>

        <div className="footer-container-one justify-content-center gap-4 m-0 w-100">
          <div className="footer-card-secound text-white d-flex flex-column align-items-start m-0">
            <div className="light-box text-white d-flex flex-row align-items-start m-0">
              <img style={{ width: "35px" }} src={light} alt="Light logo" />
              <h6 className="p-1 m-0">Get Exclusive Offers & Expert Tips</h6>
            </div>
            <div className="w-100 m-0 p-0 d-flex flex-row">
              <input
                className="input-contact m-0 p-1"
                placeholder="Sign up for mail"
              />
              <button className="button-mail m-0 p-0">JOIN</button>
            </div>
          </div>
          <div className="footer-card-secound text-white  d-flex flex-row align-items-start m-0">
            <img style={{ width: "40px" }} src={axe} alt="Axe logo" />
            <p className="p-1 m-0">
              <b>Own an Ace Store Your</b> ultimate power tool for
              <br /> business success.
            </p>
          </div>
          <div className="footer-card-secound text-white  d-flex flex-row align-items-start mb-8">
            <img style={{ width: "40px" }} src={aw} alt="Aw logo" />
            <p className="p-1 m-0" style={{ fontSize: "14px" }}>
              <b style={{ fontSize: "18px" }}>#1 in Customer Satisfaction</b>{" "}
              Ranked Highest in <br /> Customer Satisfaction among Home
              Improvement Retail
              <br /> Stores. Ranked by J.D. Power, Rated by our Customers.
            </p>
          </div>
        </div>
        <div className="social-accounts w-100 d-flex flex-row align-items-center gap-5 m-0 p-5 justify-content-center">
          <a href="https://www.facebook.com/acehardware">
            <img
              style={{ width: "25px", padding: "0px", margin: "0px" }}
              src={fb}
              alt="Facebook"
            />
          </a>
          <a href="https://www.instagram.com/acehardware/">
            <img
              src={inst}
              style={{ width: "25px", padding: "0px", margin: "0px" }}
              alt="Instagram"
            />
          </a>
          <a href="https://twitter.com/AceHardware">
            <img
              src={twit}
              style={{ width: "25px", padding: "0px", margin: "0px" }}
              alt="Twiter"
            />
          </a>
          <a href="https://www.pinterest.com/acehardware/">
            <img
              src={pint}
              style={{ width: "25px", padding: "0px", margin: "0px" }}
              alt="Pinterest"
            />
          </a>
          <a href="https://www.youtube.com/user/acehardware">
            <img
              src={yt}
              alt="Youtube"
              style={{ width: "25px", padding: "0px", margin: "0px" }}
            />
          </a>
        </div>
        <div className="privacy-text-global text-white w-100 d-flex flex-column  align-items-center m-0 p-0">
          <div className="privacy-text d-flex flex-row w-100 gap-3">
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
            <p>Interest Based Ads</p>
            <p>For U.S Residents Only</p>
            <p>Your Privacy Choices</p>
            <img
              style={{ width: "28px", height: "23px" }}
              src={privacy}
              alt="Privacy"
            />
          </div>
          <p>
            © 2023 Ace Hardware. Ace Hardware and the Ace Hardware logo are
            registered trademarks of Ace Hardware Corporation. All rights
            reserved.
          </p>
          <p>
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
              href="mailto:acehardware@gmail.com"
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

export default Footer;
