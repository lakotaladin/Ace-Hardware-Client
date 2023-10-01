import React from "react";

const SearchInput = ({ value, onChange, onSearch }) => {
  return (
    <div>
      <input
        className="input-search"
        type="text"
        placeholder="Enter City, State, or Zip"
        value={value}
        onChange={onChange}
      />
      <button className="search-button" onClick={onSearch}>
        Find Stores
      </button>
    </div>
  );
};

export default SearchInput;
