import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    category,
    subs,
    shippings,
    quantity,
    fueltypes,
    thermometers,
    ignitiontypes,
    numberOfMainBurners,
    technologyes,
    frontSideShelfs,
    frontSideShelf,
    primaryOutputBurners,
    primaryOutputBurner,
    assemblys,
    assembly,
    gateSurfaceMaterials,
    gateSurfaceMaterial,
    isFreePickups,
    isFreePickup,
    recommendeds,
    recommended,
    images,
    colors,
    brands,
    color,
    brand,
    shipping,
    watts,
    watt,
    numberofblades,
    numberofblade,
    yardsizes,
    yardsize,
    maxforwardspeeds,
    maxforwardspeed,
    poweredbys,
    poweredby,
    primarycookingareas,
    primarycookingarea,
    warrantys,
    warranty,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          value={shipping === "Yes" ? "Yes" : "No"}
          className="form-control"
          onChange={handleChange}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select
          value={color}
          name="color"
          className="form-control"
          onChange={handleChange}
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Number of blade</label>
        <select
          value={numberofblade}
          name="numberofblade"
          className="form-control"
          onChange={handleChange}
        >
          {numberofblades.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Front Side Shelfs</label>
        <select
          value={frontSideShelf}
          name="frontSideShelf"
          className="form-control"
          onChange={handleChange}
        >
          {frontSideShelfs.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Gate Surface Materials</label>
        <select
          value={gateSurfaceMaterial}
          name="gateSurfaceMaterial"
          className="form-control"
          onChange={handleChange}
        >
          {gateSurfaceMaterials.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Primary Output Burners</label>
        <select
          value={primaryOutputBurner}
          name="primaryOutputBurner"
          className="form-control"
          onChange={handleChange}
        >
          {primaryOutputBurners.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Watt</label>
        <select
          value={watt}
          name="watt"
          className="form-control"
          onChange={handleChange}
        >
          {watts.map((watt) => (
            <option key={watt} value={watt}>
              {watt}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Yard Size</label>
        <select
          value={yardsize}
          name="yardsize"
          className="form-control"
          onChange={handleChange}
        >
          {yardsizes.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Max Forward Speed</label>
        <select
          value={maxforwardspeed}
          name="maxforwardspeed"
          className="form-control"
          onChange={handleChange}
        >
          {maxforwardspeeds.map((numspeed) => (
            <option key={numspeed} value={numspeed}>
              {numspeed}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Warranty</label>
        <select
          value={warranty}
          name="warranty"
          className="form-control"
          onChange={handleChange}
        >
          {warrantys.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Primary cooking area</label>
        <select
          value={primarycookingarea}
          name="primarycookingarea"
          className="form-control"
          onChange={handleChange}
        >
          {primarycookingareas.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Free Pickup</label>
        <select
          value={isFreePickup}
          name="isFreePickup"
          className="form-control"
          onChange={handleChange}
        >
          {isFreePickups.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Powered by</label>
        <select
          value={poweredby}
          name="poweredby"
          className="form-control"
          onChange={handleChange}
        >
          {poweredbys.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Thermometer</label>
        <select
          value={thermometers}
          name="thermometer"
          className="form-control"
          onChange={handleChange}
        >
          {thermometers.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Fuel Type</label>
        <select
          value={fueltypes}
          name="fueltype"
          className="form-control"
          onChange={handleChange}
        >
          {fueltypes.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Ignition Type</label>
        <select
          value={ignitiontypes}
          name="ignitiontype"
          className="form-control"
          onChange={handleChange}
        >
          {ignitiontypes.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Assembly</label>
        <select
          value={assembly}
          name="assembly"
          className="form-control"
          onChange={handleChange}
        >
          {assemblys.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Recommended</label>
        <select
          value={recommended}
          name="recommended"
          className="form-control"
          onChange={handleChange}
        >
          {recommendeds.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Number Of Main Burners</label>
        <select
          value={numberOfMainBurners}
          name="numberOfMainBurner"
          className="form-control"
          onChange={handleChange}
        >
          {numberOfMainBurners.map((numb) => (
            <option key={numb} value={numb}>
              {numb}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Technology</label>
        <select
          value={technologyes}
          name="technology"
          className="form-control"
          onChange={handleChange}
        >
          {technologyes.map((tec) => (
            <option key={tec} value={tec}>
              {tec}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brand</label>
        <select
          value={brand}
          name="brand"
          className="form-control"
          onChange={handleChange}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
