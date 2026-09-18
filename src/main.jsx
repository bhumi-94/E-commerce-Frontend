import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/app/store.js";
import ScrollToTop from "./Components/common/scrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
      <BrowserRouter>
      <ScrollToTop />
        <App />
      </BrowserRouter>
  </Provider>,
);
