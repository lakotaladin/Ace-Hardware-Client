import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form
      className="form-inline d-flex flex-row my-2 my-lg-0"
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChange}
        type="search"
        value={text}
        style={{ borderRight: "none", height: "45px", borderRadius: "0px" }}
        className="form-control mr-sm-2"
        placeholder="What can we help you find?"
      />
      <div
        style={{
          width: "10%",
          justifyContent: "center",
          backgroundColor: "#EEEEEE",
          borderTop: "1px solid #ccc",
          borderRight: "1px solid #ccc",
          borderBottom: "1px solid #ccc",
          borderLeft: "none",
        }}
        className="buttonsearch p-1 align-items-center d-flex"
      >
        <SearchOutlined
          onClick={handleSubmit}
          style={{
            cursor: "pointer",
            color: "#E52538",
            transform: "scale(1.6)",
          }}
        />
      </div>
    </form>
  );
};

export default Search;
