import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, Heart, ShoppingCart, User } from "lucide-react";
import Banner from "./Banner";
import Logo from "../common/Logo";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Shipping Banner */}
      <Banner />

      {/* Main Navbar */}
      <nav className="h-[68px] bg-white border-b border-[#eee9e5]">
        <div className="max-w-[1400px] h-full mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-2 ml-8">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-[#fff8e8] text-[#8b3905]"
                    : "text-gray-600 hover:text-[#8b3905]"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-[#fff8e8] text-[#8b3905]"
                    : "text-gray-600 hover:text-[#8b3905]"
                }`
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/electronics"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-[#fff8e8] text-[#8b3905]"
                    : "text-gray-600 hover:text-[#8b3905]"
                }`
              }
            >
              Electronics
            </NavLink>

            <NavLink
              to="/deals"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-[#fff8e8] text-[#8b3905]"
                    : "text-gray-600 hover:text-[#8b3905]"
                }`
              }
            >
              Deals
            </NavLink>
          </div>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-[570px] mx-8">
            <input
              type="text"
              placeholder="Search products, brands and categories..."
              className="w-full h-11 rounded-[14px] border border-[#e5e1de] bg-[#fafafa] px-4 outline-none focus:border-[#8b3905] transition"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigate("/wishlist");
              }}
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              <Heart size={21} className="text-gray-700" />
            </button>

            <button
              onClick={() => {
                navigate("/cart");
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              <ShoppingCart size={21} className="text-gray-700" />
            </button>

            <button
              onClick={() => {
                navigate("/notification");
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              <Bell size={21} className="text-gray-700" />
            </button>

            <Link
              to="/profile"
              className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[#8b3905] text-white text-sm font-medium hover:bg-[#743004] transition"
            >
              <User size={17} />
              <span className="hidden sm:block">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
