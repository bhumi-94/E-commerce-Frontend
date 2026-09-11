import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
        <div className="h-10 w-10 rounded-[12px] bg-[#8b3905] flex items-center justify-center">
          <span className="text-white font-bold text-lg">N</span>
        </div>

        <span className="hidden sm:block text-xl font-bold text-[#211f1d]">
          Nexora
        </span>
      </Link>
    </div>
  );
};

export default Logo;
