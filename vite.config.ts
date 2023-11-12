import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin({
      API_KEY: "b5012636c81dde3475ff4c99dba14ec9",
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://api.stlouisfed.org/fred",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
