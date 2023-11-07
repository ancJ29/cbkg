import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.scss";
import { LanguageProvider } from "./contexts/LanguageContext";

const root = document.getElementById("root");
root &&
  ReactDOM.createRoot(root).render(
    <React.Suspense>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </React.Suspense>,
  );
