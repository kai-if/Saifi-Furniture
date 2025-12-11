import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // your Tailwind / global styles
import "./styles/animations.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
