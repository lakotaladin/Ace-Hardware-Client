import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, getSub, getSubs, removeSub } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import AdminHeader from "../../../components/nav/AdminHeader";
import LoadingCardText from "../../../components/cards/LoadingCardText";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [category, setCategory] = useState("");
  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));
  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user?.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
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
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user?.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <>
      <AdminHeader />
      <div className="container-fluid">
        <div style={{ display: "flex", flex: "wrap" }} className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            {loading ? (
              <LoadingCardText count={3} />
            ) : (
              <h4>Create sub category</h4>
            )}

            <div className="form-group">
              <label>Parent category</label>
              <select
                name="category"
                className="form-control w-25"
                onChange={(e) => setCategory(e.target.value)}
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

            {/* {JSON.stringify(category)} */}

            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />

            {/* step 2 and step 3 */}
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {/* Filter subs */}
            <div className="fluid d-flex flex-row p-1 mb-2 justify-content-between">
              <p className="m-0 p-0">Name of sub category:</p>
              <p className="m-0 p-0">Action</p>
            </div>
            {subs.filter(searched(keyword)).map((s) => (
              <div
                style={{
                  borderRadius: "0px",
                  backgroundColor: "white",
                  borderLeft: "1px dashed black",
                  borderTop: "1px dashed black",
                  borderRight: "1px dashed black",
                  borderBottom: "4px solid #E52538",
                }}
                className="alert justify-content-between d-flex flex-row alert-secondary"
                key={s._id}
              >
                {s.name}
                <div className="gap-1 d-flex flex-row">
                  <Link to={`/admin/sub/${s.slug}`}>
                    <span className="btn bg-white btn-sm float-right">
                      <EditOutlined
                        style={{ transform: "scale(1.5)" }}
                        className="text-warning"
                      />
                    </span>
                  </Link>
                  <span
                    onClick={() => handleRemove(s.slug)}
                    className="btn btn-sm bg-white float-right"
                  >
                    <DeleteOutlined
                      style={{ transform: "scale(1.5)" }}
                      className="text-danger"
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCreate;
