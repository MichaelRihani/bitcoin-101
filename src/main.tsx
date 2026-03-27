import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const toyBlockHeight = Math.floor(Date.now() / 600_000);
console.info(
  "%cBitcoin 101%c\nDon't trust. Verify.\nToy block height: " +
    toyBlockHeight +
    " (not real chain data)",
  "font-weight:700;color:#f7931a;font-size:13px",
  "color:inherit",
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
