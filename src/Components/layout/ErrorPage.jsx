import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-sm max-md:px-4">
        
        <h1 className="text-8xl md:text-9xl font-bold text-amber-950">
          404
        </h1>

        <div className="h-1 w-16 rounded bg-[#7B3306] my-5 md:my-7"></div>

        <p className="text-2xl md:text-3xl font-bold text-amber-800">
          Page Not Found
        </p>

        <p className="text-sm md:text-base mt-4 text-amber-700 max-w-md text-center">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-amber-950 hover:bg-amber-900 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
          >
            Return Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;
