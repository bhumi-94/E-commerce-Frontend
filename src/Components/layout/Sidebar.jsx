import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "My Orders",
      path: "/orders",
      icon: Package,
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: Heart,
    },
    {
      name: "Addresses",
      path: "/addresses",
      icon: MapPin,
    },
    {
      name: "Payment Methods",
      path: "/payment-methods",
      icon: CreditCard,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-full lg:w-[260px] shrink-0">
      <div className="bg-white rounded-[22px] border border-[#eee8e3] p-3 shadow-sm">
        {/* Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm font-medium transition ${
                    isActive
                      ? "bg-[#f5e9e1] text-[#8b3905]"
                      : "text-gray-600 hover:bg-[#faf7f4] hover:text-[#8b3905]"
                  }`
                }
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-3 border-t border-[#eee8e3]" />

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut size={19} strokeWidth={1.8} />

          <span>Logout</span>
        </button>
        {/* <Logout /> */}
      </div>
    </aside>
  );
};

export default Sidebar;