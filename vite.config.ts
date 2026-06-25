import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_HOST = "https://www.abhishekvasu.dev";

function isHidden(entry: { hidden?: boolean | string }) {
  return entry?.hidden === true || entry?.hidden === "true";
}

function readJson<T>(relativePath: string): T | null {
  const fullPath = path.resolve(__dirname, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  return JSON.parse(fs.readFileSync(fullPath, "utf-8")) as T;
}

function getArticleRoutes(): string[] {
  const index = readJson<{ articles?: Array<{ id: string; hidden?: boolean | string }> }>(
    "articles/index.json",
  );
  if (!index?.articles) return [];

  return index.articles
    .filter((article) => !isHidden(article))
    .map((article) => `/blog/${article.id}`);
}

function getFeaturedProjectRoutes(): string[] {
  const index = readJson<{
    projects?: Array<{ id: string; hidden?: boolean | string }>;
    featured_projects?: Array<{ id: string; hidden?: boolean | string }>;
  }>("featured-projects/index.json");
  const entries = index?.projects ?? index?.featured_projects ?? [];
  if (!Array.isArray(entries)) return [];

  return entries
    .filter((project) => !isHidden(project))
    .map((project) => `/featured-projects/${project.id}`);
}

const dynamicRoutes = ["/portfolio", "/blog", ...getArticleRoutes(), ...getFeaturedProjectRoutes()];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: SITE_HOST,
      dynamicRoutes,
      exclude: ["/404"],
      generateRobotsTxt: true,
      robots: [{ userAgent: "*", allow: "/" }],
    }),
  ],
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
});
