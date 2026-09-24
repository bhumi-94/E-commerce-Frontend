import React from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearProfile } from "../../features/profile/ProfileSlice";
import { logoutUserThunk } from "../../features/auth/authSlice";
import { useNavigate, NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();

      dispatch(clearProfile());

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf8]">
        <p className="text-red-500">Unable to load profile</p>
      </div>
    );
  }

  const profileInitial = user.first_name?.charAt(0)?.toUpperCase() || "U";

  const profileImage = user.profile_image
    ? `http://localhost:3000${user.profile_image}`
    : null;

  const navClass = ({ isActive }) =>
    `
      w-full
      flex
      items-center
      gap-4
      px-5
      py-4
      rounded-xl
      transition
      ${
        isActive
          ? "bg-[#fff9e9] text-[#8b3905]"
          : "text-[#4c4845] hover:bg-[#faf8f5]"
      }
    `;

  return (
    <div className="min-h-screen bg-[#f8f8f7] px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
        <aside className="bg-white rounded-[24px] overflow-hidden border border-[#eeeae5] h-fit">
          {/* ================= USER ================= */}

          <div className="bg-[#fffaf0] px-7 py-8">
            <div className="w-[70px] h-[70px] rounded-[18px] overflow-hidden bg-[#e8e8e8] mb-5">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#8b3905]">
                  {profileInitial}
                </div>
              )}
            </div>

            <h2 className="text-lg font-bold text-[#211f1d]">
              {user.first_name} {user.last_name}
            </h2>

            <p className="text-sm text-[#9b948e] mt-1 break-all">
              {user.email}
            </p>
          </div>

          {/* ================= NAVIGATION ================= */}

          <nav className="p-3 space-y-1">
            {/* PROFILE */}

            <NavLink to="/profile" end className={navClass}>
              <User size={21} />
              <span>Profile</span>
            </NavLink>

            {/* ORDERS */}

            <NavLink to="/profile/orders" className={navClass}>
              <Package size={21} />
              <span>My Orders</span>
            </NavLink>

            {/* WISHLIST */}

            <NavLink to="/profile/wishlist" className={navClass}>
              <Heart size={21} />
              <span>Wishlist</span>
            </NavLink>

            {/* ADDRESSES */}

            <NavLink to="/profile/addresses" className={navClass}>
              <MapPin size={21} />
              <span>Addresses</span>
            </NavLink>

            {/* PAYMENT */}

            <NavLink to="/profile/payment-methods" className={navClass}>
              <CreditCard size={21} />
              <span>Payment Methods</span>
            </NavLink>

            {/* NOTIFICATIONS */}

            <NavLink to="/profile/notifications" className={navClass}>
              <Bell size={21} />
              <span>Notifications</span>
            </NavLink>

            {/* SETTINGS */}

            <NavLink to="/profile/settings" className={navClass}>
              <Settings size={21} />
              <span>Settings</span>
            </NavLink>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-xl
                text-red-500
                hover:bg-[#faf8f5]
                transition
              "
            >
              <LogOut size={21} />

              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Profile;
