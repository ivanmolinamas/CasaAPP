import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme appearance="dark" accentColor="jade" grayColor="sage" radius="large">
      <App />
     <ThemePanel />
    </Theme>
  </StrictMode>
);
