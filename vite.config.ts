import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.BASE_URL || "/",
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom")) return "react-dom";
          if (id.includes("node_modules/react/") || id.includes("node_modules/react\\")) {
            return "react";
          }
          if (id.includes("node_modules/react-router") || id.includes("node_modules/react-router-dom")) {
            return "router";
          }
        },
      },
    },
  },
  ssr: {
    noExternal: ["react-helmet-async"],
  },
});
