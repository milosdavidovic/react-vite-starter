import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // global styles
import { APP_CONFIG } from "./utils/config";

// Start the mocking conditionally.
if (APP_CONFIG.MODE === "development" && APP_CONFIG.VL_ENABLE_MOCKING === "true") {
  // Uncomment to start the mocking (and create handlers for the mocked endpoints)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  import("./libs/msw").then(({ worker }) => {
    worker.start();
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
