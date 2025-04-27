import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set default document language to English
document.documentElement.lang = 'en';
document.documentElement.classList.add('font-english');

createRoot(document.getElementById("root")!).render(
  <App />
);
