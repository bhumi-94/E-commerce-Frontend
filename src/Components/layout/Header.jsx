import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import Logo from "../common/Logo";
import { clearProfile } from "../../features/profile/ProfileSlice";
import { logoutUserThunk } from "../../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);

  const { user } = useSelector((state) => state.profile);
  const isAuthenticated = !!user;

  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const wishlistCount = wishlistItems.length;

  // CLOSE PROFILE WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // USER NAME
  const userName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
    : "User";

  // PROFILE IMAGE
  const profileImage = user?.profile_image
    ? `http://localhost:3000/${user.profile_image.replace(/^\/+/, "")}`
    : null;

  // LOGOUT
  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();

      dispatch(clearProfile());
      setProfileOpen(false);
      setMobileMenuOpen(false);

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // MOBILE NAVIGATION
  const handleMobileNavigation = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* SHIPPING BANNER */}
      <Banner />

      {/* ================= DESKTOP / MAIN NAVBAR ================= */}
      <nav className="h-[68px] bg-white border-b border-[#eee9e5]">
        <div className="max-w-[1400px] h-full mx-auto px-3 sm:px-6 lg:px-10 flex items-center gap-2">
          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={22} className="text-gray-700" />
            ) : (
              <Menu size={22} className="text-gray-700" />
            )}
          </button>

          {/* LOGO */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 ml-4 lg:ml-8">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition ${
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
                `px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition ${
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
                `px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition ${
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
                `px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-[#fff8e8] text-[#8b3905]"
                    : "text-gray-600 hover:text-[#8b3905]"
                }`
              }
            >
              Deals
            </NavLink>
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden lg:flex flex-1 max-w-[570px] mx-4 xl:mx-8">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products, brands and categories..."
                className="
                  w-full
                  h-11
                  rounded-[14px]
                  border
                  border-[#e5e1de]
                  bg-[#fafafa]
                  pl-11
                  pr-4
                  outline-none
                  focus:border-[#8b3905]
                  transition
                "
              />
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* WISHLIST */}
            <button
              type="button"
              onClick={() => navigate("/wishlist")}
              className="
                relative
                flex
                h-9 w-9
                sm:h-10 sm:w-10
                items-center
                justify-center
                rounded-full
                hover:bg-gray-100
                transition
              "
            >
              <Heart size={20} className="text-gray-700" />

              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* CART */}
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="
                relative
                flex
                h-9 w-9
                sm:h-10 sm:w-10
                items-center
                justify-center
                rounded-full
                hover:bg-gray-100
                transition
              "
            >
              <ShoppingCart size={20} className="text-gray-700" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-[#8b3905] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* NOTIFICATION */}
            <button
              type="button"
              onClick={() => navigate("/notifications")}
              className="
                flex
                h-9 w-9
                sm:h-10 sm:w-10
                items-center
                justify-center
                rounded-full
                hover:bg-gray-100
                transition
              "
            >
              <Bell size={20} className="text-gray-700" />
            </button>

            {/* ================= AUTH / PROFILE ================= */}

            {!isAuthenticated ? (
              /* LOGIN */
              <button
                type="button"
                onClick={() => navigate("/")}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  h-9
                  sm:h-10
                  px-3
                  sm:px-5
                  rounded-xl
                  bg-[#8b3905]
                  text-white
                  text-sm
                  font-medium
                  hover:bg-[#743004]
                  transition
                "
              >
                <User size={17} />

                <span className="hidden sm:inline">Login</span>
              </button>
            ) : (
              /* PROFILE */
              <div ref={profileRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="
                    flex
                    items-center
                    gap-1
                    sm:gap-2
                    h-9
                    sm:h-10
                    px-1
                    sm:px-3
                    rounded-xl
                    bg-[#f7f7f7]
                    hover:bg-[#eeeeee]
                    transition
                  "
                >
                  {/* PROFILE IMAGE */}
                  <div
                    className="
                      w-8
                      h-8
                      rounded-full
                      overflow-hidden
                      bg-[#8b3905]
                      flex
                      items-center
                      justify-center
                      text-white
                      text-sm
                      font-semibold
                      shrink-0
                    "
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      userName.charAt(0).toUpperCase()
                    )}
                  </div>

                  {/* PROFILE TEXT */}
                  <span
                    className="
                      hidden
                      sm:block
                      text-sm
                      font-medium
                      text-[#403c39]
                    "
                  >
                    User Profile
                  </span>

                  <ChevronDown
                    size={15}
                    className={`
                      hidden sm:block
                      text-gray-500
                      transition-transform
                      ${profileOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {/* PROFILE DROPDOWN */}
                {profileOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      top-[52px]
                      w-[280px]
                      sm:w-[300px]
                      max-w-[calc(100vw-24px)]
                      bg-white
                      rounded-[18px]
                      shadow-[0_10px_40px_rgba(0,0,0,0.15)]
                      border
                      border-[#eee9e5]
                      overflow-hidden
                      z-50
                    "
                  >
                    {/* USER INFORMATION */}
                    <div
                      className="
                        px-5
                        py-6
                        flex
                        flex-col
                        items-center
                        text-center
                      "
                    >
                      {/* LARGE PROFILE IMAGE */}
                      <div
                        className="
                          w-[72px]
                          h-[72px]
                          rounded-full
                          overflow-hidden
                          bg-[#8b3905]
                          flex
                          items-center
                          justify-center
                          text-white
                          text-2xl
                          font-semibold
                          mb-3
                        "
                      >
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          userName.charAt(0).toUpperCase()
                        )}
                      </div>

                      {/* USER NAME */}
                      <h3
                        className="
                          text-[17px]
                          font-semibold
                          text-[#211f1d]
                        "
                      >
                        {userName}
                      </h3>

                      {/* USER EMAIL */}
                      <p
                        className="
                          mt-1
                          text-sm
                          text-[#9a928c]
                          max-w-[240px]
                          truncate
                        "
                      >
                        {user?.email}
                      </p>
                    </div>

                    <div className="border-t border-[#eee9e5]" />

                    {/* MY PROFILE */}
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/profile");
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-5
                        py-4
                        text-left
                        text-[#403c39]
                        hover:bg-[#faf8f5]
                        hover:text-[#8b3905]
                        transition
                      "
                    >
                      <User size={19} />

                      <span className="text-sm font-medium">My Profile</span>
                    </button>

                    <div className="border-t border-[#eee9e5]" />

                    {/* LOGOUT */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-5
                        py-4
                        text-left
                        text-red-500
                        hover:bg-red-50
                        transition
                      "
                    >
                      <LogOut size={19} />

                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================= MOBILE SEARCH ================= */}
        <div className="lg:hidden px-3 sm:px-6 pb-3 bg-white border-b border-[#eee9e5]">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products, brands and categories..."
              className="
                w-full
                h-10
                rounded-[12px]
                border
                border-[#e5e1de]
                bg-[#fafafa]
                pl-11
                pr-4
                text-sm
                outline-none
                focus:border-[#8b3905]
                transition
              "
            />
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#eee9e5] shadow-lg">
            <div className="px-4 py-3 space-y-1">
              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-[#fff8e8] text-[#8b3905]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-[#fff8e8] text-[#8b3905]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                Shop
              </NavLink>

              <NavLink
                to="/electronics"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-[#fff8e8] text-[#8b3905]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                Electronics
              </NavLink>

              <NavLink
                to="/deals"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-[#fff8e8] text-[#8b3905]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                Deals
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
