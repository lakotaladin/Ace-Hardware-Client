import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LadingCardText from "../../../components/cards/LoadingCardText";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import { DeleteOutlined } from "@ant-design/icons";
import AdminHeader from "../../../components/nav/AdminHeader";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discounnt, setDiscounnt] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" coupon is created`);
      })
      .catch((err) => console.log("create coupon err", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Are you sure to delete this coupon?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <AdminHeader />
      <div className="couponglobaldiv w-100 p-0 mt-2 m-0">
        <div className="containercoupon container-fluid">
          <div className="couponrow row">
            <div className="adminsider col-md-2">
              <AdminNav />
            </div>
            <div className="col-md-10">
              {loading ? <LadingCardText count={3} /> : <h4>Coupon create</h4>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="text-muted mt-3">Name of coupon:</label>
                  <input
                    type="text"
                    placeholder="Type name..."
                    className="form-control w-25 mt-1"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label className="text-muted">Discount %</label>
                  <input
                    type="text"
                    placeholder="%"
                    className="form-control w-25"
                    onChange={(e) => setDiscount(e.target.value)}
                    value={discount}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label className="text-muted">Expiry:</label>
                  <br />
                  <DatePicker
                    className="form-control mt-2 mb-3 w-100"
                    selected={new Date()}
                    value={expiry}
                    onChange={(date) => setExpiry(date)}
                    required
                  />
                </div>

                <button
                  style={{
                    width: "150px",
                    backgroundColor: "#E52538",
                    border: "none",
                  }}
                  className="btn btn-outline-primary text-white mb-3"
                >
                  Save
                </button>
              </form>
              <h2 className="mb-4">{coupons.length} Coupons</h2>

              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Expiry</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {coupons.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{new Date(c.expiry).toLocaleDateString()}</td>
                      <td>{c.discount}%</td>
                      <td style={{ width: "100px" }}>
                        <DeleteOutlined
                          onClick={() => handleRemove(c._id)}
                          className="text-danger pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCouponPage;
