import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set default document language to Arabic
document.documentElement.lang = 'ar';
document.documentElement.dir = 'rtl';
document.documentElement.classList.add('font-arabic');

createRoot(document.getElementById("root")!).render(
  <App />
);
