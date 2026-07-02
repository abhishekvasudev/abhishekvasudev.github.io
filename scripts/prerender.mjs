#!/usr/bin/env node
/**
 * Prerenders every public route to static HTML after the Vite client build.
 * Injects SSR app markup and react-helmet head tags into the built shell.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";
import { getPublicRoutes } from "./routes.mjs";
import { routeToDistPath } from "./site-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(REPO_ROOT, "dist");
const SSR_DIR = path.join(REPO_ROOT, "dist-ssr");
const PUBLIC_ARTICLES_DIR = path.join(REPO_ROOT, "public", "articles");

function loadPrerenderArticles() {
  const articles = {};
  if (!fs.existsSync(PUBLIC_ARTICLES_DIR)) return articles;
  for (const slug of fs.readdirSync(PUBLIC_ARTICLES_DIR)) {
    const jsonPath = path.join(PUBLIC_ARTICLES_DIR, slug, "article.json");
    if (fs.existsSync(jsonPath)) {
      articles[slug] = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    }
  }
  return articles;
}

function getShellHtml() {
  const shellPath = path.join(DIST_DIR, "index.html");
  const raw = fs.readFileSync(shellPath, "utf-8");

  return raw
    .replace(/<div id="root">[\s\S]*?<\/div>/, '<div id="root"></div>')
    .replace(/<meta name="description"[^>]*>\s*/i, "")
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "");
}

function extractHeadFromAppHtml(appHtml) {
  const headParts = [];
  let cleanBody = appHtml;

  const patterns = [
    /<title>[\s\S]*?<\/title>/gi,
    /<meta[^>]*>/gi,
    /<link[^>]*>/gi,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/gi,
  ];

  for (const pattern of patterns) {
    const matches = appHtml.match(pattern);
    if (matches) {
      headParts.push(...matches);
      cleanBody = cleanBody.replace(pattern, "");
    }
  }

  return {
    headTags: headParts.join("\n"),
    cleanBody,
  };
}

function injectPrerenderedHtml(shellHtml, appHtml, bootstrapJson) {
  const { headTags, cleanBody } = extractHeadFromAppHtml(appHtml);
  let html = shellHtml;

  if (headTags.trim()) {
    html = html.replace("</head>", `    ${headTags}\n  </head>`);
  }

  const bootstrap = bootstrapJson
    ? `\n    <script id="article-bootstrap" type="application/json">${bootstrapJson.replace(/</g, "\\u003c")}</script>`
    : "";

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${cleanBody}</div>${bootstrap}`,
  );
  return html;
}

async function buildSsrBundle() {
  await fs.promises.rm(SSR_DIR, { recursive: true, force: true });

  await build({
    configFile: path.join(REPO_ROOT, "vite.config.ts"),
    build: {
      ssr: path.join(REPO_ROOT, "src/entry-server.tsx"),
      outDir: SSR_DIR,
      emptyOutDir: true,
      rollupOptions: {
        input: path.join(REPO_ROOT, "src/entry-server.tsx"),
        output: {
          entryFileNames: "entry-server.js",
        },
      },
    },
    ssr: {
      noExternal: ["react-helmet-async"],
    },
  });
}

async function prerender() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error("[prerender] dist/ not found — run vite build first.");
    process.exit(1);
  }

  const shellHtml = getShellHtml();
  const routes = getPublicRoutes();

  console.log(`[prerender] Building SSR bundle...`);
  await buildSsrBundle();

  const ssrEntry = path.join(SSR_DIR, "entry-server.js");
  const { render } = await import(pathToFileURL(ssrEntry).href);
  const prerenderArticles = loadPrerenderArticles();

  console.log(`[prerender] Rendering ${routes.length} route(s)...`);

  for (const route of routes) {
    globalThis.__PRERENDER_ARTICLES__ = prerenderArticles;
    const { appHtml } = render(route);
    const articleSlug = route.match(/^\/blog\/([^/]+)$/)?.[1];
    const bootstrapJson = articleSlug
      ? JSON.stringify(prerenderArticles[articleSlug] ?? null)
      : null;
    const html = injectPrerenderedHtml(
      shellHtml,
      appHtml,
      articleSlug && prerenderArticles[articleSlug] ? bootstrapJson : null,
    );
    const distRelative = routeToDistPath(route);
    const outputPath = path.join(DIST_DIR, distRelative);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);
    console.log(`[prerender] ✓ ${route} → ${distRelative}`);
  }

  // Branded 404 page (no redirect hack)
  globalThis.__PRERENDER_ARTICLES__ = prerenderArticles;
  const notFound = render("/__404__");
  const notFoundHtml = injectPrerenderedHtml(shellHtml, notFound.appHtml, null);
  fs.writeFileSync(path.join(DIST_DIR, "404.html"), notFoundHtml);
  console.log("[prerender] ✓ 404.html");

  await fs.promises.rm(SSR_DIR, { recursive: true, force: true });
  delete globalThis.__PRERENDER_ARTICLES__;
  console.log("[prerender] Done.");
}

prerender().catch((err) => {
  console.error("[prerender] Fatal:", err);
  process.exit(1);
});
