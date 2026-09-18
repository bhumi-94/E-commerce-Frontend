import React from "react";
import AppRoutes from "../src/routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const App = () => {
  return (
    <div className="h-full w-full">
      <AppRoutes />
    </div>
  );
};

export default App;
