import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import Dashboard from "../Pages/dashboard/Dashboard";
import ForgetPassword from "../Pages/auth/ForgotPassword";
import ErrorPage from "../Components/layout/ErrorPage";
import ResetPassword from "../Pages/auth/ResetPassword";
import Shop from "../Pages/dashboard/Shop";
import Electronics from "../Pages/dashboard/Electronics";
import Deals from "../Pages/dashboard/Deals";
import Wishlist from "../Pages/dashboard/Wishlist";
import Cart from "../Pages/dashboard/Cart";
import Profile from "../Pages/dashboard/Profile";
import Notification from "../Pages/dashboard/Notification";
import ProductDetails from "../Pages/dashboard/ProductDetails";

import MainLayout from "../layouts/MainLayout";

import { fetchProfile } from "../features/profile/ProfileSlice";

import { fetchCart } from "../features/cart/cartSlice";
import { fetchWishlist } from "../features/wishlist/wishlistSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.profile);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.profile);
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
const AppRoutes = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.profile);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, [dispatch, user?.id]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await dispatch(fetchProfile()).unwrap();
      } catch (error) {
        console.log("No authenticated user");
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuthentication();
  }, [dispatch]);

  if (!authChecked || loading) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#FCFBF3]
      "
      >
        <div
          className="
          text-[#8b3905]
          font-semibold
        "
        >
          Loading...
        </div>
      </div>
    );
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgetPassword />
          </PublicRoute>
        }
      />

      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/electronics" element={<Electronics />} />

        <Route path="/deals" element={<Deals />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/notification" element={<Notification />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
