#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import { getPublicRoutes } from "./routes.mjs";
import { SITE_URL, routeToDistPath } from "./site-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "..", "dist");

const BUDGETS = {
  initialJsGzip: 180 * 1024,
  initialCssGzip: 50 * 1024,
  lazyChunkGzip: 250 * 1024,
};

function gzipSize(buffer) {
  return zlib.gzipSync(buffer).length;
}

function readDist(relativePath) {
  return fs.readFileSync(path.join(DIST_DIR, relativePath));
}

function assertFile(relativePath) {
  const full = path.join(DIST_DIR, relativePath);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing required dist file: ${relativePath}`);
  }
}

function extractMeta(html, pattern) {
  const match = html.match(pattern);
  return match?.[1]?.trim() ?? "";
}

function verifyHtmlFile(route, distRelative) {
  const html = readDist(distRelative).toString("utf-8");
  const title = extractMeta(html, /<title>([^<]*)<\/title>/i);
  const description = extractMeta(html, /<meta name="description" content="([^"]*)"/i);
  const canonical = extractMeta(html, /<link rel="canonical" href="([^"]*)"/i);

  if (!title) throw new Error(`${route}: missing <title>`);
  if (!description) throw new Error(`${route}: missing meta description`);
  if (!canonical.startsWith(SITE_URL)) throw new Error(`${route}: invalid canonical ${canonical}`);
  if (!html.includes("<h1")) throw new Error(`${route}: missing <h1>`);

  return { title, description, canonical };
}

function verifyBudgets() {
  const assetsDir = path.join(DIST_DIR, "assets");
  const files = fs.readdirSync(assetsDir);

  let initialJs = 0;
  let initialCss = 0;

  for (const file of files) {
    const content = readDist(path.join("assets", file));
    const gz = gzipSize(content);
    if (file.startsWith("index-") && file.endsWith(".js")) initialJs += gz;
    if (file.startsWith("index-") && file.endsWith(".css")) initialCss += gz;
    if (file.endsWith(".js") && gz > BUDGETS.lazyChunkGzip) {
      throw new Error(`Chunk ${file} exceeds ${BUDGETS.lazyChunkGzip} bytes gzip (${gz})`);
    }
  }

  if (initialJs > BUDGETS.initialJsGzip) {
    throw new Error(`Initial JS gzip ${initialJs} exceeds budget ${BUDGETS.initialJsGzip}`);
  }
  if (initialCss > BUDGETS.initialCssGzip) {
    throw new Error(`Initial CSS gzip ${initialCss} exceeds budget ${BUDGETS.initialCssGzip}`);
  }

  console.log(`[verify] Budgets OK — JS ${(initialJs / 1024).toFixed(1)} KB, CSS ${(initialCss / 1024).toFixed(1)} KB gzip`);
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error("[verify] dist/ not found");
    process.exit(1);
  }

  const routes = getPublicRoutes();
  const titles = new Set();

  for (const route of routes) {
    const distRelative = routeToDistPath(route);
    assertFile(distRelative);
    const meta = verifyHtmlFile(route, distRelative);
    if (titles.has(meta.title)) {
      throw new Error(`Duplicate title: ${meta.title}`);
    }
    titles.add(meta.title);
  }

  for (const file of [
    "sitemap.xml",
    "robots.txt",
    "rss.xml",
    "CNAME",
    ".nojekyll",
    "favicon.ico",
    "favicon-16.png",
    "favicon-32.png",
    "apple-touch-icon.png",
    "icon-192.png",
    "icon-512.png",
    "site.webmanifest",
    "images/og-default.png",
    "404.html",
  ]) {
    assertFile(file);
  }

  const sitemap = readDist("sitemap.xml").toString("utf-8");
  if (!sitemap.includes(SITE_URL)) throw new Error("sitemap.xml missing SITE_URL");

  const rss = readDist("rss.xml").toString("utf-8");
  if (!rss.includes(SITE_URL)) throw new Error("rss.xml missing SITE_URL");

  verifyBudgets();
  console.log(`[verify] ✓ ${routes.length} routes, SEO files, favicons, and budgets passed`);
}

try {
  main();
} catch (err) {
  console.error(`[verify] FAILED: ${err.message}`);
  process.exit(1);
}
