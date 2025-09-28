import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import AppProvider from "./providers/AppProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <ThemeProvider>
          <App />
          <ToastContainer theme="colored" />
        </ThemeProvider>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
