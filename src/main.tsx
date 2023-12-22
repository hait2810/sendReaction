import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { StyleProvider } from "@ant-design/cssinjs";
import React from "react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyleProvider hashPriority="high">
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </StyleProvider>
  </React.StrictMode>
);
