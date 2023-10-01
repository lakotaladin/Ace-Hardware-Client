import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Cart = lazy(() => import("./pages/Cart"));
const Home = lazy(() => import("./pages/Home"));
const Location = lazy(() => import("./pages/Location"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const Storeinfo = lazy(() => import("./pages/Storeinfo"));
const Profile = lazy(() => import("./pages/userPages/User"));
const Account = lazy(() => import("./pages/userPages/Account"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const History = lazy(() => import("./pages/userPages/History"));
const Wishlist = lazy(() => import("./pages/userPages/Wishlist"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const LayoutPage = lazy(() => import("./components/layout/LayoutPage"));
const Product = lazy(() => import("./pages/Product"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCouponPage")
);
const Payment = lazy(() => import("./pages/Payment"));
const GlobalSpinner = lazy(() => import("./components/Spinners/GlobalSpinner"));
const Shop = lazy(() => import("./pages/shop/Shop"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));

const App = () => {
  const dispatch = useDispatch();
  const [loadingGlobal, setLoadingGlobal] = useState(false);

  // to check firebase auth state
  useEffect(() => {
    setLoadingGlobal(true);
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user?.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                lastName: res.data.lastName,
                address: res.data.streetAddress,
                email: res.data.email,
                phone: res.data.phone,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
      setLoadingGlobal(false);
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Suspense>
      <SideDrawer />
      <ToastContainer />
      {loadingGlobal ? (
        <GlobalSpinner />
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/product/:slug" component={Product} />
          <Route exact path="/location" component={Location} />
          <Route exact path="/categories" component={LayoutPage} />
          <Route exact path="/store-details" component={Storeinfo} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/category/:slug" component={CategoryHome} />
          <Route exact path="/sub/:slug" component={SubHome} />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <UserRoute exact path="/myaccount" component={Profile} />
          <UserRoute exact path="/account" component={Account} />
          <UserRoute exact path="/checkout" component={Checkout} />
          <UserRoute exact path="/payment" component={Payment} />
          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute exact path="/admin/category" component={CategoryCreate} />
          <AdminRoute exact path="/admin/sub" component={SubCreate} />
          <AdminRoute
            exact
            path="/admin/category/:slug"
            component={CategoryUpdate}
          />
          <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
          <AdminRoute exact path="/admin/product" component={ProductCreate} />
          <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
          <AdminRoute exact path="/admin/products" component={AllProducts} />
          <AdminRoute
            exact
            path="/admin/product/:slug"
            component={ProductUpdate}
          />
        </Switch>
      )}
    </Suspense>
  );
};

export default App;
