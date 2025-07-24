import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeUserProvider } from "./Context/ThemeUserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeUserProvider>
      <App />
    </ThemeUserProvider>
  </StrictMode>
);
