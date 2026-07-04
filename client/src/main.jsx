import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "@fontsource/inter";

import "./styles/variables.css";
import "./styles/globals.css";

import "./index.css";
import "./styles/navbar.css";
import "./styles/buttons.css";
import "./styles/cards.css";
import "./styles/home.css";
import "./styles/forms.css";
import "./styles/dashboard.css";
import "./styles/footer.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);