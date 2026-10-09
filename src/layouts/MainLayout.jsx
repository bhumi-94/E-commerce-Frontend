import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/layout/Header";
import Footer from "../Components/layout/Footer";
import Chatbot from "../Components/chatbot/chatbot";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#fcfbf8]">
      <Header />

      <main className="pt-[112px]">
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default MainLayout;
