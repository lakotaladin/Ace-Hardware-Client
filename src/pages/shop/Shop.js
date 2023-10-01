import React, { useEffect, useState } from "react";
import "./shop.css";
import { Breadcrumb, Button, Input } from "antd";
import Header from "../../components/nav/Header";
import Footer from "../../components/footer/Footer";
import { Menu, Slider, Checkbox, Radio } from "antd";
import ScrollToTopButton from "../../components/ScrollOnTop/ScrollOnTopButton";
import { CloseOutlined, LeftOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../../functions/product";
import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";
import Star from "../../components/forms/Star";
import ProductCard from "../../components/cards/ProductCard";
import LoadingCard from "../../components/cards/LoadingCard";
import { useDispatch, useSelector } from "react-redux";
import Storetime from "../../components/Storeworktime/Storetime";
import noproduct from "../../resources/noproduct.jpg";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Weber",
    "Treager",
    "Big Green Egg",
    "Blackstone",
    "Pit Boss",
    "Loco",
    "Ooni",
    "Gozney",
    "Char-Broil",
    "Meat Chunch BBQ",
    "Ace",
    "Cadet",
    "Comfort Zone",
    "Crown",
    "Dial",
    "Ghp",
    "American Wick",
    "Dewalt",
    "Mr. Heater",
    "Tru Aire",
    "Easy Heat",
    "Perfect Aire",
    "2000 Flushes",
    "30 Secounds",
    "Alogma",
    "Ball",
    "Benjamin Moore",
    "Beyound Bright",
    "American Lawn Mower Company",
    "Arnold",
    "Craftsman",
    "Agri-Fab",
    "Black + Decker",
    "Briggs & Stratton",
    "Ego",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Black/Silver",
    "Blue",
    "Fireman Red",
    "GRAY",
    "Silver",
    "Stainless Steel",
    "Titanium",
    "Red",
    "Green",
    "Titanium",
    "Purple",
    "Navy",
    "White",
    "Charcoal",
    "Indigo",
    "Orange",
    "Stainless Steel",
    "Deep Ocean Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [originalBrands, setOriginalBrands] = useState([...brands]);
  const [categoryChecked, setCategoryChecked] = useState({});

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setLoading(true);
      setProducts(p.data);
      setLoading(false);
    });
  };

  // Brands search bar
  const handleBrandSearch = (e) => {
    setBrandSearch(e.target.value.toLowerCase());
    const filteredBrands = originalBrands.filter((brand) =>
      brand.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setBrands(filteredBrands);
  };

  const handleBrandReset = () => {
    setBrandSearch("");
    setBrands(originalBrands);
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4 checkbox-style"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div key={s._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4 checkbox-style"
          value={s._id}
          name="category"
          checked={categoryIds.includes(s._id)}
        >
          {s.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Checkbox
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Checkbox>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setBrand(e.target.value);
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4 checkbox-style"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4 checkbox-style"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <>
      <div className="countainer-fluid d-flex flex-column global p-0 m-0 d-flex">
        <Header />
        <div className="header-bottom d-flex flex-column p-0 m-0">
          <Breadcrumb
            style={{
              height: "30px",
              margin: "0px",
              paddingTop: "1%",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Breadcrumb.Item>
              <LeftOutlined style={{ fontSize: "11px", margin: "0px" }} />
              <Link to="/" className="link">
                Ace Hardware
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Shop</Breadcrumb.Item>
          </Breadcrumb>
          <div className="page-title d-flex flex-row justify-content-end p-0 m-0">
            <h2 className="mt-3">{products.length} Items Found</h2>
          </div>
        </div>
        <div
          style={{ width: "80%", backgroundColor: "white" }}
          className="shopsection m-auto p-1 m-0 mb-5 row"
        >
          <div
            style={{
              maxHeight: "100vh",
              overflowY: "scroll",
              position: "sticky",
            }}
            className="col-md-3 pt-2"
          >
            <h4>Shop My Store</h4>
            <Storetime style={{ fontSize: "12px" }} />
            <hr />

            <Menu
              defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
              mode="inline"
            >
              {/* price */}
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <b>Price</b>
                  </span>
                }
              >
                <div className="bg-white" style={{ backgroundColor: "white" }}>
                  <Slider
                    className="ml-4 mr-4"
                    tooltipFormatter={(v) => `$${v}`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max="4999"
                  />
                </div>
              </SubMenu>

              {/* category */}
              <SubMenu
                key="2"
                title={
                  <span className="h6 p-0 m-0">
                    <b>Categories</b>
                  </span>
                }
              >
                <div style={{ maringTop: "-10px", backgroundColor: "white" }}>
                  {showCategories()}
                </div>
              </SubMenu>

              {/* stars */}
              <SubMenu
                key="3"
                title={
                  <span className="h6">
                    <b>Rating</b>
                  </span>
                }
              >
                <div style={{ maringTop: "-10px", backgroundColor: "white" }}>
                  {showStars()}
                </div>
              </SubMenu>

              {/* sub category */}
              <SubMenu
                key="4"
                title={
                  <span className="h6">
                    <b>Sub Categories</b>
                  </span>
                }
              >
                <div
                  style={{ maringTop: "-10px", backgroundColor: "white" }}
                  className="pl-4 pr-4"
                >
                  {showSubs()}
                </div>
              </SubMenu>

              {/* Dodajte pretragu brendova */}
              <Input
                placeholder="Search"
                className="w-100 mt-1"
                prefix={<SearchOutlined />}
                value={brandSearch}
                onChange={handleBrandSearch}
                style={{ marginBottom: "10px", borderRadius: "4px" }}
                suffix={
                  brandSearch && (
                    <CloseOutlined
                      onClick={handleBrandReset}
                      style={{ cursor: "pointer" }}
                    />
                  )
                }
              />
              {/* brands */}
              <SubMenu
                key="5"
                title={
                  <span className="h6">
                    <b>Brands</b>
                  </span>
                }
              >
                <div
                  style={{ maringTop: "-10px", backgroundColor: "white" }}
                  className="pr-5"
                >
                  {showBrands()}
                </div>
              </SubMenu>

              {/* colors */}
              <SubMenu
                key="6"
                title={
                  <span className="h6">
                    <b>Colors</b>
                  </span>
                }
              >
                <div
                  style={{ maringTop: "-10px", backgroundColor: "white" }}
                  className="pr-5"
                >
                  {showColors()}
                </div>
              </SubMenu>

              {/* shipping */}
              <SubMenu
                key="7"
                title={
                  <span className="h6">
                    <b>Shipping</b>
                  </span>
                }
              >
                <div
                  style={{ maringTop: "-10px", backgroundColor: "white" }}
                  className="pr-5"
                >
                  {showShipping()}
                </div>
              </SubMenu>
            </Menu>
          </div>

          <div style={{ maxHeight: "auto" }} className="col-md-9">
            {loading ? (
              <LoadingCard count={3} />
            ) : (
              <div
                style={{ overflowX: "hidden" }}
                className="allproducts w-100 p-0 m-0 row pb-5"
              >
                {products.map((p) => (
                  <div
                    key={p._id}
                    style={{ display: "flex", flexWrap: "wrap" }}
                    className="col-lg-4 col-md-6 col-sm-12 mt-3"
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}

            {products.length < 1 && (
              <div className="noitems d-flex w-100 flex-column align-items-center align-text-center">
                <img src={noproduct} style={{ width: "50%" }} alt="noproduct" />
                <p className="m-auto p-0 d-flex">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Shop;
