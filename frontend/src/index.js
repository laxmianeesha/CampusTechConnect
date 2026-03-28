import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './Ccss/global.css';
// // ✅ Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";

// // (Optional) Bootstrap JS for dropdowns, modals, etc.
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
     <BrowserRouter>   
      <App />
    </BrowserRouter>
  </React.StrictMode>
);