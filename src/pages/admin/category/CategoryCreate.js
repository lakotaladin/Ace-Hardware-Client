import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created!`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Are you sure to delete this category?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  return (
    <div className="container-fluid">
      <div className="header-admin justify-content-center d-flex align-items-center w-100 m-0 p-0">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Create category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          {/* Search */}
          <LocalSearch keyword={keyword} setKeyword={handleSubmit} />
          <div className="fluid d-flex flex-row p-1 mb-2 justify-content-between">
            <p className="m-0 p-0">Name of category:</p>
            <p className="m-0 p-0">Action</p>
          </div>
          {categories.filter(searched(keyword)).map((c) => (
            <div
              className="alert alert-secondary d-flex justify-content-between"
              key={c._id}
            >
              <p style={{ fontWeight: "bold" }} className="m-0 p-0">
                {c.name}
              </p>
              <div className="d-flex alert-secondary flex-row p-o m-0">
                <span
                  onClick={() => handleRemove(c.slug)}
                  className="btn btn-md"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/category/${c.slug}`}>
                  <span className="btn btn-md">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
