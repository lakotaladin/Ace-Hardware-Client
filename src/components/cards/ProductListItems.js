import React from "react";
import "./productItem.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductListItems = ({ product }) => {
  const {
    brand,
    description,
    category,
    subs,
    shipping,
    thermometer,
    burnerOutputRange,
    fueltype,
    ignitiontype,
    numberOfMainBurner,
    technology,
    color,
    primaryOutputBurner,
    gateSurfaceMaterial,
    assembly,
    frontSideShelf,
    isFreePickup,
  } = product;
  return (
    <>
      <div
        style={{ backgroundColor: "#F7F7F7" }}
        className="bg-white w-100 d-flex flex-column gap-3 m-0 p-0"
      >
        <h3 className="bg-white info-title p-2 m-0">Product Overview</h3>
        <div className="bg-white w-100 spec p-2 pb-0 m-0">
          <p>{description}</p>
        </div>
        <h3 className="info-title p-2 pb-0 m-0">Specifications</h3>
        <div className="w-100 spec p-2 m-0">
          <ul className="list-group">
            <li className="list-group-item border-0 p-0 pt-3">
              Brand Name:{" "}
              <span className="label label-default label-pill">{brand}</span>
            </li>
            {category && (
              <li className="list-group-item border-0 p-0">
                Category:{" "}
                <Link
                  to={`/category/${category.slug}`}
                  className="label label-default label-pill"
                >
                  {category.name}
                </Link>
              </li>
            )}

            {subs && (
              <li className="list-group-item border-0 p-0">
                Sub Category{" "}
                {subs.map((s) => (
                  <Link
                    key={s._id}
                    to={`/sub/${s.slug}`}
                    className="label label-default label-pill"
                  >
                    {s.name}
                  </Link>
                ))}
              </li>
            )}

            <li className="list-group-item border-0 p-0">
              Color:{" "}
              <span className="label label-default label-pill">{color}</span>
            </li>
            <li className="list-group-item border-0 p-0">
              Shipping:{" "}
              <span className="label label-default label-pill">{shipping}</span>
            </li>
            <li className="list-group-item border-0 p-0">
              Fuel Type:{" "}
              <span className="label label-default label-pill">{fueltype}</span>
            </li>
            <li className="list-group-item border-0 p-0">
              Thermometer:{" "}
              <span className="label label-default label-pill">
                {thermometer}
              </span>
            </li>
            <li className="list-group-item border-0 p-0">
              Burner Output Range:{" "}
              <span className="label label-default label-pill">
                {burnerOutputRange}
              </span>
            </li>
            <li className="list-group-item border-0 p-0">
              Number Of Main Burner:{" "}
              <span className="label label-default label-pill">
                {numberOfMainBurner}
              </span>
            </li>
            <li className="list-group-item border-0 p-0">
              Primary Output Burner:{" "}
              <span className="label label-default label-pill">
                {primaryOutputBurner}
              </span>
            </li>
            <li className="list-group-item border-0 p-0">
              Technology:{" "}
              <span className="label label-default label-pill">
                {technology}
              </span>
            </li>
            <li className="list-group-item border-0 p-0">
              Gate Surface Material:{" "}
              <span className="label label-default label-pill">
                {gateSurfaceMaterial}
              </span>
            </li>
            <li className="list-group-item border-0 p-0">
              Ignition Type:{" "}
              <span className="label label-default label-pill">
                {ignitiontype}
              </span>
            </li>
            <li className="list-group-item border-0 p-0">
              Assembly:{" "}
              <span className="label label-default label-pill">{assembly}</span>
            </li>
            {/* <li className="list-group-item border-0 p-0">
              Quantity:{" "}
              <span className="label label-default label-pill">{quantity}</span>
            </li>
            <li className="list-group-item border-0 p-0">
              Sold:{" "}
              <span className="label label-default label-pill">{sold}</span>
            </li> */}
            <li className="list-group-item border-0 p-0">
              Front Side Shelf:{" "}
              <span className="label label-default label-pill">
                {frontSideShelf}
              </span>
            </li>
            <li className="list-group-item border-0 p-0">
              Free Pickup:{" "}
              <span className="label label-default label-pill">
                {isFreePickup}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductListItems;
