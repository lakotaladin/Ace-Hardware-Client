import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import "./productcreate.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import LoadingIutlined from "@ant-design/icons";
import AdminHeader from "../../../components/nav/AdminHeader";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shippings: ["Yes", "No"],
  isFreePickups: ["Yes", "No"],
  recommendeds: ["Yes", "No"],
  frontSideShelfs: ["Yes", "No"],
  assemblys: ["Yes", "No"],
  gateSurfaceMaterials: [
    "Carbon Steel",
    "Cast Iron",
    "Cold Rolled Steel",
    "Procelain",
    "Procelain Coated Cast Iron",
  ],
  primaryOutputBurners: [
    "<5000 British Thermal Unit",
    ">5001 British Thermal Unit",
    "20001-30000 British Thermal Unit",
    "30001-40000 British Thermal Unit",
    "40001-50000 British Thermal Unit",
    "5000-20000 British Thermal Unit",
    "50001-20000 British Thermal Unit",
  ],
  quantity: "",
  fueltypes: [
    "Charcoal",
    "Liquid Propane",
    "Natural Gas",
    "Natural Gas/Propane",
    "Wood Chips",
  ],
  technologyes: ["Bluetooth", "WiFi"],
  thermometers: ["Yes", "No"],
  ignitiontypes: [
    "Continuous Spark",
    "Electrical",
    "Manual",
    "Propane",
    "Single Spark Ignition",
  ],
  numberOfMainBurners: [
    "1 Burner",
    "2 Burner",
    "3 Burner",
    "4 Burner",
    "5 Burner",
    "6 Burner",
  ],
  watts: ["1560 Watt", "1750 Watt", "1760 Watt", "250 Watt", "450 Watt"],
  numberofblades: ["1 Blade", "2 Blade", "3 Blade"],
  yardsizes: ["< 1 Acre", "1-2 Acre", "2-4 Acre"],
  maxforwardspeeds: [
    "4 Mile Per Hour",
    "5.5 Mile Per Hour",
    "7 Mile Per Hour",
    "8 Mile Per Hour",
  ],
  poweredbys: ["Battery", "Gas"],
  primarycookingareas: ["524 square inch", "535 square inch"],
  warrantys: ["1 Year", "2 Year", "3 Year", "4 Year", "5 Year", "10 Year"],
  images: [],
  colors: [
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
  ],
  brands: [
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
  ],
  color: "",
  brand: "",
  shipping: "",
  numberOfMainBurner: "",
  thermometer: "",
  fueltype: "",
  ignitiontype: "",
  technology: "",
  isFreePickup: "",
  recommended: "",
  frontSideShelf: "",
  assembly: "",
  watt: "",
  gateSurfaceMaterial: "",
  primaryOutputBurner: "",
  numberofblade: "",
  yardsize: "",
  maxforwardspeed: "",
  poweredby: "",
  primarycookingarea: "",
  warranty: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState("");
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user?.token)
      .then((res) => {
        console.log(res);
        window.alert(`${res.data.title} is created!`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
    setShowSub(true);
  };
  return (
    <div className="productcreate container-fluid p-0 m-0">
      <AdminHeader />
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="productcontainer col-md-10">
          {loading ? (
            <LoadingIutlined className="text-danger h1" />
          ) : (
            <h2 style={{ marginTop: "2%" }}>Product create</h2>
          )}

          {/* {JSON.stringify(values)} */}
          {/* Image upload input */}
          <div style={{ width: "250px" }} className="imgdiv m-0">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
