import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-500 hover:bg-red-50"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
