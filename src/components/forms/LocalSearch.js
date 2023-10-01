import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const { Search } = Input;
  return (
    <Search
      type="search"
      placeholder="Search sub categories"
      value={keyword}
      onChange={handleSearchChange}
      className="searchsub w-50 mb-4 mt-4"
      autoFocus
      allowClear
    />
  );
};

export default LocalSearch;
