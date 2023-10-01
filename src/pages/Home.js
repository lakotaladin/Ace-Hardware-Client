import React, { useEffect, useState } from "react";
import "./home.css";
import { useHistory } from "react-router-dom";
import Header from "../components/nav/Header";
import NewArrivals from "../components/layout/productsort/NewArrivals";
import ScrollToTopButton from "../components/ScrollOnTop/ScrollOnTopButton";
import Footer from "../components/footer/Footer";
import kids from "../homeassets/kids.jpg";
import cardhuman from "../homeassets/cardhuman.jpg";
import saveyeti from "../homeassets/saveyeti.png";
import traeger from "../homeassets/traeger.png";
import solostove from "../homeassets/solostove.png";
import grill from "../homeassets/grill.jpg";
import details from "../homeassets/detailsship.png";
import peoplecard from "../homeassets/peoplescard.jpg";
import grill1 from "../homeassets/1.jpg";
import grill2 from "../homeassets/2.jpg";
import grill3 from "../homeassets/3.jpg";
import grill4 from "../homeassets/4.jpg";
import generac from "../homeassets/generac.jpg";
import cat1 from "../homeassets/cat1.png";
import cat2 from "../homeassets/cat2.png";
import cat3 from "../homeassets/cat3.png";
import cat4 from "../homeassets/cat4.png";
import cat5 from "../homeassets/cat5.png";
import cat7 from "../homeassets/cat7.png";
import cat8 from "../homeassets/cat8.png";
import cat12 from "../homeassets/cat12.png";
import cat10 from "../homeassets/cat10.png";
import cat11 from "../homeassets/cat11.png";
import cat13 from "../homeassets/cat13.png";
import cat14 from "../homeassets/sale.svg";
import yeti from "../homeassets/yeticollection.png";
import colorad from "../homeassets/colorsad.png";
import waystoshop from "../homeassets/ways.png";
import loveace from "../homeassets/loveace.png";
import allbrands from "../homeassets/allbrands.png";
import women from "../homeassets/women.jpg";
import compressor from "../homeassets/compressor.jpg";
import garage from "../homeassets/garage.jpg";
import pellet from "../homeassets/pellet.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Modal } from "antd";
import LoadingCard from "../components/cards/LoadingCard";
import ProductCarousel from "../components/layout/productsort/ProductCarousel";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  // Za modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header />
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="homeglobal mt-1 p-0 m-0 w-100 d-flex flex-column">
          <div className="homecontainer bg-white mt-1 p-0 d-flex flex-column">
            <div
              className="globalcontainer d-flex  mt-1 bg-white"
              style={{
                width: "100%",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <div
                style={{ width: "100%" }}
                className="topcardrow row bg-white"
              >
                <div className="p-0 col-lg-3 col-md-6 col-sm-12 mb-4">
                  <div
                    style={{ height: "100%", width: "80%" }}
                    className="card m-auto col-sm-5"
                  >
                    <img
                      src={kids}
                      alt="Image1"
                      className="border-0 rounded-none card-img-top"
                    />
                    <div className="card-body">
                      <h3 style={{ color: "#D40029", fontWeight: "bold" }}>
                        A New Season of Savings
                      </h3>
                      <p style={{ color: "black" }}>
                        Explore Fall deals for your home and garden
                      </p>
                    </div>
                    <div className="card-footer">
                      <Link className="linkcard" to="/shop">
                        <u style={{ color: "#D40029" }}>Shop Fall now</u>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-0 col-lg-3 col-md-6 col-sm-12 mb-4">
                  <div
                    style={{ height: "100%", width: "80%" }}
                    className="card  m-auto"
                  >
                    <img
                      src={cardhuman}
                      alt="cardhuman"
                      style={{ height: "35%" }}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <img
                        src={saveyeti}
                        alt="Slika 2.1"
                        style={{
                          width: "100px",
                          margin: "0px 0px 5px 0px",
                          padding: "0px",
                        }}
                      />
                      <p className="card-text">
                        On select YETI Roadie 48 Roller Coolers
                      </p>
                    </div>
                    <div className="card-footer">
                      <Link className="linkcard" to="/shop">
                        <u style={{ color: "#D40029" }}>Shop YETI</u>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-0 col-lg-3 col-md-6 col-sm-12 mb-4">
                  <div
                    style={{ height: "100%", width: "80%" }}
                    className="card m-auto"
                  >
                    <img src={grill} alt="Slika 3" className="card-img-top" />
                    <div className="card-body">
                      <img
                        src={traeger}
                        alt="Slika 3.1"
                        style={{
                          width: "auto",
                          margin: "0px 0px 5px 0px",
                          padding: "0px",
                        }}
                      />
                      {/* <h6 style={{ color: "#D40029" }}>Timber</h6> */}
                      <p className="card-text">
                        Save up to $700 on select Traeger Timberline Pellet
                        Grills.
                      </p>
                    </div>
                    <div className="card-footer">
                      <Link className="linkcard" to="/shop">
                        <u style={{ color: "#D40029" }}>Shop now</u>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-0 col-lg-3 col-md-6 col-sm-12 mb-4">
                  <div
                    style={{ height: "100%", width: "80%" }}
                    className="card m-auto"
                  >
                    <img
                      src={peoplecard}
                      alt="People"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <img
                        src={solostove}
                        alt="logo"
                        style={{
                          width: "auto",
                          margin: "0px 0px 5px 0px",
                          padding: "0px",
                        }}
                      />
                      <h5 style={{ marginTop: "7%" }} className="card-text">
                        Bonfire 2.0 + Stand&nbsp;&amp;&nbsp;Shelter
                      </h5>
                      <p className="card-text">
                        19.5 in. W Stainless Steel Round Wood&nbsp;Fire&nbsp;Pit
                      </p>
                    </div>
                    <div className="card-footer">
                      <Link className="linkcard" to="/shop">
                        <u style={{ color: "#D40029" }}>Shop Outdoor Heating</u>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="details p-0 m-0">
              <Link to="/shop">
                <img className="w-100" src={details} alt="delivery" />
              </Link>
              <div className="detailsdiv d-flex p-0 m-0 justify-content-end">
                <p onClick={showModal} className="detailstext p-0 m-0">
                  <u>*See Details</u>
                </p>
                <Modal
                  open={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null} // Ukloni footer
                  centered // Modal se otvara na sredini ekrana
                >
                  <p className="p-3">
                    *FREE ASSEMBLY AND DELIVERY FROM YOUR LOCAL ACE on grills
                    $399+ for Ace Rewards members. At participating locations
                    only within the local delivery area, as defined by store.
                    Online and Ace app purchases eligible when Ace Rewards
                    member's account is associated with its acehardware.com and
                    Ace App login, is currently signed in and member's purchase
                    is associated with a participating store. Member must select
                    "Free Delivery From Store" and "Assembly" in cart. Delivery
                    dates subject to availability. Offer not valid on prior
                    purchases or ship to home orders. Excludes Char-Broil.
                  </p>
                </Modal>
              </div>
            </div>
            <ProductCarousel />
            {/* Our best deals */}
            <div className="container-fluid p-0 m-0">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 style={{ fontWeight: "bold" }}>
                    Our Best Deals on Grilling
                  </h1>
                </div>
              </div>
              <div className="row mt-4 text-center">
                <div className="col-md-3">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        src={grill1}
                        alt="Slika 1"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h4 className="card-title font-weight-bold">
                          Buy & Get
                        </h4>
                        <p className="card-text hover-underline">
                          Buy Traeger Ironwood 650 Wood Pellet Grill, Get
                          Folding Front Shelf and Grill Cover Free
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        src={grill2}
                        alt="Slika 2"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h4 className="card-title font-weight-bold">
                          Save up to &#x24;70
                        </h4>
                        <p className="card-text hover-underline">
                          on Big Green Egg Large and XLarge Grill EGGspander Kit
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        src={grill3}
                        alt="Slika 3"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h4 className="card-title font-weight-bold">
                          Master the Art of Grilling
                        </h4>
                        <p className="card-text hover-underline">
                          Shop Weber Grills
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        src={grill4}
                        alt="Slika 4"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h4 className="card-title font-weight-bold">
                          Explore Outdoor Pizza Ovens
                        </h4>
                        <p className="card-text hover-underline">
                          Shop Ooni Ovens
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {/* New Arrivals */}
            <NewArrivals />
            {/* Generac banner  */}
            <div className="container-fluid p-0 m-0">
              <Link to="/shop">
                <img
                  style={{ width: "100%", marginTop: "2%", marginBottom: "2%" }}
                  src={generac}
                  alt="Generac"
                />
              </Link>
            </div>
            {/* Shop by Category */}
            <div className="container-fluid category-div p-0 m-0">
              <div className="row p-0 m-0">
                <div className="col-md-12 text-center">
                  <h1
                    style={{
                      fontWeight: "bold",
                      marginTop: "2%",
                      marginBottom: "2%",
                    }}
                  >
                    Shop by Category
                  </h1>
                </div>
              </div>
              {/* Prvi red */}
              <div className="row mt-4 text-center">
                {/* Kolona 1 */}
                <div className="col-md-2 col-4 p-0">
                  <Link to="/category/grills-and-smokers" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        style={{
                          backgroundColor: "#EFEFEF",
                          padding: "3%",
                        }}
                        src={cat1}
                        alt="Slika 1"
                        className="card-img-top rounded-circle"
                      />
                      <div className="card-body">
                        <h6 className="card-title">Grills & Smokers</h6>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* Dodajte još 6 kartica u kolonu 1 */}
                <div className="col-md-2 col-4 p-0">
                  <Link to="/category/lawn-mowers" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        style={{
                          backgroundColor: "#EFEFEF",
                          padding: "3%",
                        }}
                        src={cat2}
                        alt="Slika 2"
                        className="card-img-top rounded-circle"
                      />
                      <div className="card-body">
                        <h6 className="card-title font-weight-bold">
                          Lawn Mowers
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-2 col-4 p-0">
                  <Link to="/category/lawn-care" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        style={{
                          backgroundColor: "#EFEFEF",
                          padding: "4%",
                        }}
                        src={cat3}
                        alt="Slika 3"
                        className="card-img-top rounded-circle"
                      />
                      <div className="card-body">
                        <h6 className="card-title font-weight-bold">
                          Lawn Care
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-2 col-4 p-0">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        style={{
                          backgroundColor: "#EFEFEF",
                          padding: "3%",
                        }}
                        src={cat4}
                        alt="Slika 4"
                        className="card-img-top rounded-circle"
                      />
                      <div className="card-body">
                        <h6 className="card-title font-weight-bold">
                          Outdoor Storage
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* Dodajte još 3 kartice u kolonu 1 */}
                <div className="col-md-2 col-4 p-0">
                  <Link
                    to="/category/outdoor-power-equipment"
                    className="textlink"
                  >
                    <div className="card bg-white border-0">
                      <img
                        style={{
                          backgroundColor: "#EFEFEF",
                          padding: "3%",
                        }}
                        src={cat5}
                        alt="Slika 1"
                        className="card-img-top rounded-circle"
                      />
                      <div className="card-body">
                        <h6 className="card-title font-weight-bold">
                          Outdoor Power Equipment
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-2 col-4 p-0">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        style={{
                          backgroundColor: "#EFEFEF",
                          padding: "4%",
                        }}
                        src={cat7}
                        alt="Slika 2"
                        className="card-img-top rounded-circle"
                      />
                      <div className="card-body">
                        <h6 className="card-title font-weight-bold">Coolers</h6>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              {/* Drugi red */}
              <div className="row mt-4 text-center">
                {/* Kolona 2 */}
                <div className="col-md-2 col-4 p-0">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        style={{
                          backgroundColor: "#EFEFEF",
                          padding: "3%",
                        }}
                        src={cat8}
                        alt="Slika 1"
                        className="card-img-top rounded-circle"
                      />
                      <div className="card-body">
                        <h6 className="card-title font-weight-bold">Patio</h6>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* Dodajte još 6 kartica u kolonu 2 */}
                <div className="col-md-2 col-4 p-0">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        style={{
                          backgroundColor: "#EFEFEF",
                          padding: "3%",
                        }}
                        src={cat10}
                        alt="Slika 2"
                        className="card-img-top rounded-circle"
                      />
                      <div className="card-body">
                        <h6 className="card-title font-weight-bold">
                          Air Conditioners
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-2 col-4 p-0">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        style={{
                          backgroundColor: "#EFEFEF",
                          padding: "3%",
                        }}
                        src={cat11}
                        alt="Slika 3"
                        className="card-img-top rounded-circle"
                      />
                      <div className="card-body">
                        <h6 className="card-title font-weight-bold">
                          Tool Storage
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-2 col-4 p-0">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        style={{
                          backgroundColor: "#EFEFEF",
                          padding: "3%",
                        }}
                        src={cat12}
                        alt="Slika 4"
                        className="card-img-top rounded-circle"
                      />
                      <div className="card-body">
                        <h6 className="card-title font-weight-bold">Paint</h6>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* Dodajte još 3 kartice u kolonu 2 */}
                <div className="col-md-2 col-4 p-0">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        style={{
                          backgroundColor: "#EFEFEF",
                          padding: "3%",
                        }}
                        src={cat13}
                        alt="Slika 1"
                        className="card-img-top rounded-circle"
                      />
                      <div className="card-body">
                        <h6 className="card-title font-weight-bold">
                          Drinkware
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-2 col-4 p-0">
                  <Link to="/shop" className="textlink">
                    <div className="card bg-white border-0">
                      <img
                        src={cat14}
                        alt="Slika 2"
                        className="card-img-top rounded-circle"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {/* YEYI Collection */}
            <div className="container-fluid p-0 m-0">
              <Link className="w-100 p-0 m-0" to="/shop">
                <img
                  className="w-100 p-0 m-0 mt-4 mb-5"
                  src={yeti}
                  alt="YETI Collection"
                />
              </Link>
            </div>
            {/* Colors ad */}
            <div className="container-fluid p-0 m-0">
              <Link to="/shop">
                <img
                  className="w-100 p-0 m-0 mt-4 mb-5"
                  src={colorad}
                  alt="YETI Collection"
                />
              </Link>
            </div>
          </div>
          {/* Convenient Ways to Shop Ace */}
          <div className="container-fluid p-0 m-0">
            <Link to="/shop">
              <img
                className="w-100 p-0 m-0 mt-4 mb-5"
                src={waystoshop}
                alt="YETI Collection"
              />
            </Link>
          </div>
          {/* Paypal and Resons To Love Ace */}
          <div className="homecontainer p-0 d-flex flex-column">
            <div className="container-fluid p-0 m-0">
              <Link to="/shop">
                <img
                  className="w-100 p-0 m-0 mt-4 mb-5"
                  src={loveace}
                  alt="Love Ace"
                />
              </Link>
            </div>
            {/* Brands */}
            <div className="container-fluid p-0 mt-1">
              <Link to="/shop">
                <img
                  className="w-100 p-0 m-0 mt-4 mb-5"
                  src={allbrands}
                  alt="All brands"
                />
              </Link>
            </div>
            {/* Videos */}
            <div className="container-fluid p-0 m-0">
              <div
                style={{ display: "flex", flexWrap: "wrap" }}
                className="row mt-5 text-center"
              >
                <h1>Tips & Advice</h1>
                <br />
                <a
                  style={{ fontSize: "18px" }}
                  className="mt-3 mb-5"
                  href="https://tips.acehardware.com/"
                  target="_blank"
                >
                  <u
                    style={{
                      color: "#F01839",
                      fontWeight: "bold",
                    }}
                  >
                    See More
                  </u>
                </a>
                <div className="col-md-3 mb-5">
                  <a
                    href="https://www.youtube.com/watch?v=3OXFdFcuV5I"
                    className="textlink"
                  >
                    <div className="card bg-white border-0">
                      <img src={women} alt="Slika 1" className="card-img-top" />
                      <div className="card-body">
                        <h4 style={{ color: "black" }}>
                          What to do to your home in September
                        </h4>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3">
                  <a
                    href="https://www.youtube.com/watch?v=F9MaG4wc3n8"
                    target="_blank"
                    className="textlink"
                  >
                    <div className="card bg-white border-0">
                      <img
                        src={pellet}
                        alt="Slika 2"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h4 style={{ color: "black" }}>
                          Our Review Of The Treager Steak Pellet Kit
                        </h4>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3">
                  <a
                    href="https://www.youtube.com/watch?v=9Sn8B2ukPL8"
                    target="_blank"
                    className="textlink"
                  >
                    <div className="card bg-white border-0">
                      <img
                        src={compressor}
                        alt="Slika 3"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h4 style={{ color: "black" }}>
                          Why You Need An Air Compressor
                        </h4>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3">
                  <a
                    href="https://www.youtube.com/watch?v=-ydGXR8fGz8&t=1s"
                    target="_blank"
                    className="textlink"
                  >
                    <div className="card bg-white border-0">
                      <img
                        src={garage}
                        alt="Slika 4"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h4 style={{ color: "black" }}>
                          Yes, You Can Paint Your Garage Floor
                        </h4>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ScrollToTopButton />
      <Footer />
    </>
  );
};

export default Home;
