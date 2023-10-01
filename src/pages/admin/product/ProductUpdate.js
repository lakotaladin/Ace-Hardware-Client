import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

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

const ProductUpdate = ({ match, history }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  // router
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // console.log("single product", p);
      // 1 load single proudct
      setValues({ ...values, ...p.data });
      // 2 load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); // on first load, show default subs
      });
      // 3 prepare array of sub ids to show as default sub values in antd Select
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log("ARR", arr);
      setArrayOfSubs((prev) => arr); // required for ant design select to work
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user?.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });

    console.log("EXISTING CATEGORY values.category", values.category);

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    // clear old sub category ids
    setArrayOfSubs([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product update</h4>
          )}
          {/* {JSON.stringify(values)} */}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
