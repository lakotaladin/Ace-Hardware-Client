import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  setValues,
  subOptions,
  showSub,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    categories,
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
    primaryOutputBurners,
    assemblys,
    gateSurfaceMaterials,
    isFreePickups,
    recommendeds,
    images,
    colors,
    brands,
    color,
    brand,
    watts,
    numberofblades,
    yardsizes,
    maxforwardspeeds,
    poweredbys,
    primarycookingareas,
    warrantys,
  } = values;

  return (
    <form onSubmit={handleSubmit} className="w-50 justify-ceontent-start">
      <div className="form-group gap-2">
        <label className="m-0 p-0">Product title:</label>
        <input
          type="text"
          name="title"
          placeholder="Product name"
          className="form-control mb-4"
          value={title}
          onChange={handleChange}
          autoFocus
        />
      </div>

      <div className="form-group">
        <label className="m-0 p-0">Description:</label>
        <input
          type="text"
          name="description"
          placeholder="Product description"
          className="form-control mb-4"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Category:</label>
        <select
          name="category"
          className="form-control mb-4"
          onChange={handleCategoryChange}
        >
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {showSub && (
        <div>
          <label className="m-0 p-0">Sub Categories:</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      <div className="form-group mt-4">
        <label className="m-0 p-0">Price:</label>
        <input
          type="number"
          name="price"
          placeholder="Price $"
          className="form-control mb-4"
          value={price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Warranty:</label>
        <select
          name="warranty"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {warrantys.map((warr) => (
            <option key={warr} value={warr}>
              {warr}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Shipping:</label>
        <select
          name="shipping"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {shippings.map((sh) => (
            <option key={sh} value={sh}>
              {sh}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Free Pickup:</label>
        <select
          name="isFreePickup"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {isFreePickups.map((frp) => (
            <option key={frp} value={frp}>
              {frp}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Recommended:</label>
        <select
          name="recommended"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {recommendeds.map((rec) => (
            <option key={rec} value={rec}>
              {rec}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Watt:</label>
        <select
          name="watt"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {watts.map((watt) => (
            <option key={watt} value={watt}>
              {watt}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Number of blades:</label>
        <select
          name="numberofblade"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {numberofblades.map((blade) => (
            <option key={blade} value={blade}>
              {blade}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Yard sizes:</label>
        <select
          name="yardsize"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {yardsizes.map((yard) => (
            <option key={yard} value={yard}>
              {yard}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Front Side Shelf:</label>
        <select
          name="frontSideShelf"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {frontSideShelfs.map((fron) => (
            <option key={fron} value={fron}>
              {fron}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Assembly:</label>
        <select
          name="assembly"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {assemblys.map((assbm) => (
            <option key={assbm} value={assbm}>
              {assbm}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Primary Output Burner:</label>
        <select
          name="primaryOutputBurner"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {primaryOutputBurners.map((prim) => (
            <option key={prim} value={prim}>
              {prim}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Gate Surface Material:</label>
        <select
          name="gateSurfaceMaterial"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {gateSurfaceMaterials.map((rec) => (
            <option key={rec} value={rec}>
              {rec}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Quantity:</label>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="form-control mb-4"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="m-0 p-0">Color:</label>
        <select
          name="color"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Primary Cooking Area:</label>
        <select
          name="primarycookingarea"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {primarycookingareas.map((primary) => (
            <option key={primary} value={primary}>
              {primary}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Thermometer:</label>
        <select
          name="thermometer"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {thermometers.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Fuel Type:</label>
        <select
          name="fueltype"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {fueltypes.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Ignition Type:</label>
        <select
          name="ignitiontype"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {ignitiontypes.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Max forward Speeds:</label>
        <select
          name="maxforwardspeed"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {maxforwardspeeds.map((forwardsp) => (
            <option key={forwardsp} value={forwardsp}>
              {forwardsp}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Powered By:</label>
        <select
          name="poweredby"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {poweredbys.map((pow) => (
            <option key={pow} value={pow}>
              {pow}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Number Of Main Burners:</label>
        <select
          name="numberOfMainBurner"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {numberOfMainBurners.map((numb) => (
            <option key={numb} value={numb}>
              {numb}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Technology:</label>
        <select
          name="technology"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {technologyes.map((tec) => (
            <option key={tec} value={tec}>
              {tec}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="m-0 p-0">Brand:</label>
        <select
          name="brand"
          className="form-control mb-4"
          onChange={handleChange}
        >
          <option>Please select</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <button className="btn w-100 bg-danger text-white border-0 p-3 mt-5 mb-5 btn-outline-info">
        Save
      </button>
    </form>
  );
};

export default ProductCreateForm;
