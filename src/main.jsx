import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './styles/index.css';
import { RotaProvider } from "./contexts/RotaContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RotaProvider>
      <App />
    </RotaProvider>
  </React.StrictMode>
);