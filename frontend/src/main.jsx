import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { TeamProvider } from "./core/context/teamContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TeamProvider>
      <App />
      <ToastContainer />
    </TeamProvider>
  </StrictMode>
);
