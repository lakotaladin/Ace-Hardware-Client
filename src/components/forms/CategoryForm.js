import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group pt-3">
      <label>Name of sub category:</label>
      <input
        type="text"
        className="form-control w-25"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />
      <br />
      <button
        style={{
          backgroundColor: "#E52538",
          letterSpacing: "2px",
          fontSize: "14px",
        }}
        className="savesub w-25 text-white btn"
      >
        Save
      </button>
    </div>
  </form>
);

export default CategoryForm;
