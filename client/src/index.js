import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CryptoProvider from "./CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";

ReactDOM.render(
  <React.StrictMode>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
