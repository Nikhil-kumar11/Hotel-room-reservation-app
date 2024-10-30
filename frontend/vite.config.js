import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/rooms": {
        target: "http://localhost:4000", // Replace with your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rooms/, "/rooms"),
      },
    },
  },
});
