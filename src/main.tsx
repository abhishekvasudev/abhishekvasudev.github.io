import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App, { AppProviders } from "./App";
import "./styles/index.css";

const rootElement = document.getElementById("root")!;

const app = (
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}

requestAnimationFrame(() => {
  document.dispatchEvent(new Event("app-rendered"));
});
