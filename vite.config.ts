/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgLoader from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

// Read more: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgLoader(), eslint()],
  server: {
    port: 3001,
    host: "127.0.0.1",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
});
