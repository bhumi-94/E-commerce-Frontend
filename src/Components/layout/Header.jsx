import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import Logo from "../common/Logo";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

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
  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    navigate("/dashboard");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* SHIPPING BANNER */}
      <Banner />

      {/* NAVBAR */}
      <nav className="h-[68px] bg-white border-b border-[#eee9e5]">
        <div className="max-w-[1400px] h-full mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* LOGO */}
          <Logo />

          {/* NAVIGATION */}
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

          {/* SEARCH */}
          <div className="hidden lg:flex flex-1 max-w-[570px] mx-8">
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
                px-4
                outline-none
                focus:border-[#8b3905]
                transition
              "
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* WISHLIST */}
            <button
              type="button"
              onClick={() => navigate("/wishlist")}
              className="
                hidden sm:flex
                h-10 w-10
                items-center
                justify-center
                rounded-full
                hover:bg-gray-100
                transition
              "
            >
              <Heart size={21} className="text-gray-700" />
            </button>

            {/* CART */}
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="
                flex
                h-10 w-10
                items-center
                justify-center
                rounded-full
                hover:bg-gray-100
                transition
              "
            >
              <ShoppingCart size={21} className="text-gray-700" />
            </button>

            {/* NOTIFICATION */}
            <button
              type="button"
              onClick={() => navigate("/notification")}
              className="
                flex
                h-10 w-10
                items-center
                justify-center
                rounded-full
                hover:bg-gray-100
                transition
              "
            >
              <Bell size={21} className="text-gray-700" />
            </button>

            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => navigate("/")}
                className="
                  flex
                  items-center
                  gap-2
                  h-10
                  px-5
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

                <span>Login</span>
              </button>
            )}

            {isAuthenticated && (
              <div ref={profileRef} className="relative">
                {/* PROFILE BUTTON */}

                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="
                    flex
                    items-center
                    gap-2
                    h-10
                    px-4
                    rounded-xl
                    bg-[#f7f7f7]
                    hover:bg-[#eeeeee]
                    transition
                  "
                >
                  {/* SMALL PROFILE IMAGE */}

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

                  {/* ONLY PROFILE TEXT */}
                  <span
                    className="
                      hidden
                      sm:block
                      text-sm
                      font-medium
                      text-[#403c39]
                    "
                  >
                    Profile
                  </span>

                  <ChevronDown
                    size={16}
                    className={`
                      text-gray-500
                      transition-transform
                      ${profileOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>
                {profileOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      top-[52px]
                      w-[300px]
                      bg-white
                      rounded-[18px]
                      shadow-[0_10px_40px_rgba(0,0,0,0.15)]
                      border
                      border-[#eee9e5]
                      overflow-hidden
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
                            className="
                              w-full
                              h-full
                              object-cover
                            "
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

                    {/* LINE */}

                    <div className="border-t border-[#eee9e5]" />

                    {/* MY PROFILE BUTTON */}

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

                    {/* LINE */}

                    <div className="border-t border-[#eee9e5]" />

                    {/* LOGOUT BUTTON */}

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
      </nav>
    </header>
  );
};

export default Header;
