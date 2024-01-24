import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import  { SiteProvider } from "./context/SiteContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SiteProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SiteProvider>
  </React.StrictMode>
);
