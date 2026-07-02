import React from "react";
import ReactDOM from "react-dom/client";
import { AppDataProvider } from "./app/providers";
import { MainPage } from "pages";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <AppDataProvider>
      <MainPage />
    </AppDataProvider>
  </React.StrictMode>,
);
