#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getRouteMeta } from "./routes.mjs";
import {
  AUTHOR_NAME,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./site-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "..", "dist");
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRss() {
  const routes = getRouteMeta();
  const articleRoutes = routes.filter((route) => route.path.startsWith("/blog/") && route.article);

  const items = articleRoutes
    .map((route) => {
      const article = route.article;
      const link = absoluteUrl(route.path);
      const pubDate = new Date(article.date).toUTCString();
      const description = article.description ?? article.excerpt ?? "";

      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
      <author>${escapeXml(AUTHOR_NAME)}</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(DEFAULT_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.writeFileSync(path.join(PUBLIC_DIR, "rss.xml"), xml);
  fs.writeFileSync(path.join(DIST_DIR, "rss.xml"), xml);
  console.log(`[rss] Wrote rss.xml (${articleRoutes.length} items)`);
}

generateRss();
