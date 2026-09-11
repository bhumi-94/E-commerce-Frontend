import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/layout/Header";
import Footer from "../Components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#fcfbf8]">

      <Header />

      <main className="pt-[112px]">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;