import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const container = document.getElementById("weather-root");
if (container) {
  const location = container.dataset.location || "Jaipur,Rajasthan";
  createRoot(container).render(
    <StrictMode>
      <App location={location} />
    </StrictMode>
  );
}
