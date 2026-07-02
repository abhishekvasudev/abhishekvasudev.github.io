#!/usr/bin/env node
/** Generate favicons, OG default image, and web manifest from the AV mark. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import siteConfig from "../src/config/site.config.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

const AV_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#000"/>
  <text x="50" y="66" font-family="system-ui, sans-serif" font-size="38" font-weight="700" text-anchor="middle" fill="#fff">AV</text>
</svg>`;

const OG_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0b0c"/>
      <stop offset="100%" stop-color="#17140f"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="80" y="80" width="120" height="120" rx="28" fill="#000" stroke="#c9a227" stroke-width="3"/>
  <text x="140" y="162" font-family="system-ui, sans-serif" font-size="46" font-weight="700" text-anchor="middle" fill="#fff">AV</text>
  <text x="240" y="150" font-family="Georgia, serif" font-size="56" fill="#f4f4f5">Abhishek Vasudev</text>
  <text x="240" y="210" font-family="system-ui, sans-serif" font-size="30" fill="#d4d4d8">Senior iOS &amp; SwiftUI Engineer</text>
  <text x="240" y="260" font-family="system-ui, sans-serif" font-size="24" fill="#a1a1aa">www.abhishekvasu.dev</text>
</svg>`;

async function writePng(svg, outputPath, size) {
  await sharp(Buffer.from(svg))
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outputPath);
}

async function main() {
  fs.mkdirSync(path.join(PUBLIC_DIR, "images"), { recursive: true });

  await writePng(AV_SVG, path.join(PUBLIC_DIR, "favicon-16.png"), 16);
  await writePng(AV_SVG, path.join(PUBLIC_DIR, "favicon-32.png"), 32);
  await writePng(AV_SVG, path.join(PUBLIC_DIR, "apple-touch-icon.png"), 180);
  await writePng(AV_SVG, path.join(PUBLIC_DIR, "icon-192.png"), 192);
  await writePng(AV_SVG, path.join(PUBLIC_DIR, "icon-512.png"), 512);

  await sharp(Buffer.from(AV_SVG)).resize(32, 32).png().toFile(path.join(PUBLIC_DIR, "favicon.ico"));

  await sharp(Buffer.from(OG_SVG)).png().toFile(path.join(PUBLIC_DIR, "images", "og-default.png"));

  const manifest = {
    name: siteConfig.SITE_NAME,
    short_name: "AV",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };

  fs.writeFileSync(path.join(PUBLIC_DIR, "site.webmanifest"), JSON.stringify(manifest, null, 2) + "\n");
  console.log("[generate-assets] Favicons, OG image, and manifest written to public/");
}

main().catch((err) => {
  console.error("[generate-assets] Fatal:", err);
  process.exit(1);
});
