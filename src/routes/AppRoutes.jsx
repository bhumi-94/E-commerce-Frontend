import React from "react";
import { Route, Routes } from "react-router-dom";
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
import Notification from "../Pages/dashboard/Notification"
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route element={<MainLayout /> } >
        <Route path='/shop' element={<Shop />} />
        <Route path='/electronics' element={<Electronics />} />
        <Route path='/deals' element={<Deals />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
