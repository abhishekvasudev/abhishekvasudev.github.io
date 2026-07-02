#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getRouteMeta, getLatestContentDate } from "./routes.mjs";
import { SITE_URL, absoluteUrl } from "./site-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "..", "dist");

function formatLastmod(value) {
  if (!value) return new Date().toISOString().split("T")[0];
  return value.includes("T") ? value.split("T")[0] : value;
}

function generateSitemap() {
  const routes = getRouteMeta();
  const latestContentDate = getLatestContentDate();

  const urls = routes
    .map((route) => {
      const loc = absoluteUrl(route.path);
      const lastmod = formatLastmod(route.updated ?? route.date ?? latestContentDate);
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), xml);
  fs.writeFileSync(path.join(DIST_DIR, "robots.txt"), robots);
  console.log(`[sitemap] Wrote sitemap.xml (${routes.length} URLs) and robots.txt`);
}

generateSitemap();
