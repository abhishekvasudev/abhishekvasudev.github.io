#!/usr/bin/env node
/**
 * Injects route-specific SEO metadata and JSON-LD into prerendered HTML files.
 * Runs after vite build to guarantee crawlers receive meta tags without executing JS.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(REPO_ROOT, "dist");

const SITE_URL = "https://www.abhishekvasu.dev";
const DEFAULT_TITLE = "Abhishek Vasudev | Senior iOS & SwiftUI Developer";
const DEFAULT_DESCRIPTION =
  "Abhishek Vasudev is a Senior iOS Engineer and SwiftUI Developer based in London. Expert in Swift, iOS development, and building scalable mobile applications at Expedia Group.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/profile2.jpg`;

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abhishek Vasudev",
  jobTitle: "Senior iOS Engineer",
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  email: "abhishekvasudev7@gmail.com",
  worksFor: { "@type": "Organization", name: "Expedia Group" },
  sameAs: [
    "https://www.linkedin.com/in/abhishek-vasudev",
    "https://github.com/abhishekvasudev/",
    "https://www.codechef.com/users/abhishekv",
  ],
  knowsAbout: [
    { "@type": "Thing", name: "iOS Development", sameAs: "https://developer.apple.com/ios/" },
    {
      "@type": "Thing",
      name: "Swift",
      sameAs: "https://en.wikipedia.org/wiki/Swift_(programming_language)",
    },
    { "@type": "Thing", name: "SwiftUI", sameAs: "https://developer.apple.com/documentation/swiftui/" },
  ],
};

function readJson(relativePath) {
  const fullPath = path.join(REPO_ROOT, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
}

function isHidden(entry) {
  return entry?.hidden === true || entry?.hidden === "true";
}

function buildMetaTags({ title, description, url, type = "website", image = DEFAULT_OG_IMAGE, jsonLd }) {
  const canonical = url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}">`,
    `<link rel="canonical" href="${escapeAttr(canonical)}">`,
    `<meta property="og:type" content="${escapeAttr(type)}">`,
    `<meta property="og:site_name" content="Abhishek Vasudev">`,
    `<meta property="og:title" content="${escapeAttr(title)}">`,
    `<meta property="og:description" content="${escapeAttr(description)}">`,
    `<meta property="og:image" content="${escapeAttr(ogImage)}">`,
    `<meta property="og:url" content="${escapeAttr(canonical)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(description)}">`,
    `<meta name="twitter:image" content="${escapeAttr(ogImage)}">`,
  ];

  if (jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);
  }

  return tags.join("\n    ");
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMetaIntoHtml(html, metaBlock) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta name="description"[^>]*>\s*/i, "")
    .replace(/<link rel="canonical"[^>]*>\s*/i, "")
    .replace(/<meta property="og:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<meta name="twitter:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "")
    .replace("</head>", `    ${metaBlock}\n  </head>`);
}

function writeRouteHtml(routePath, meta, templateHtml) {
  const html = injectMetaIntoHtml(templateHtml, buildMetaTags(meta));
  const outputDir =
    routePath === "/" ? DIST_DIR : path.join(DIST_DIR, routePath.replace(/^\//, ""));
  const outputPath = path.join(outputDir, "index.html");

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, html);
  console.log(`[inject-seo] ✓ ${routePath}`);
}

function getRoutes() {
  const routes = [
    {
      path: "/",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      url: "/",
      jsonLd: PERSON_SCHEMA,
    },
    {
      path: "/portfolio",
      title: "Portfolio | Abhishek Vasudev — Senior iOS Engineer",
      description:
        "Professional portfolio of Abhishek Vasudev — Senior iOS Engineer specializing in Swift, SwiftUI, and scalable mobile architecture.",
      url: "/portfolio",
      type: "profile",
    },
    {
      path: "/blog",
      title: "Blog | Abhishek Vasudev — iOS & Swift Developer",
      description:
        "Articles on iOS development, Swift, SwiftUI, and software engineering by Abhishek Vasudev, Senior iOS Engineer.",
      url: "/blog",
    },
  ];

  const articlesIndex = readJson("articles/index.json");
  for (const article of articlesIndex?.articles ?? []) {
    if (isHidden(article)) continue;
    routes.push({
      path: `/blog/${article.id}`,
      title: `${article.title} | Abhishek Vasudev`,
      description: article.excerpt,
      url: `/blog/${article.id}`,
      type: "article",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        author: { "@type": "Person", name: article.author, url: SITE_URL },
        url: `${SITE_URL}/blog/${article.id}`,
        keywords: article.tags?.join(", "),
      },
    });
  }

  const featuredIndex = readJson("featured-projects/index.json");
  const featuredEntries = featuredIndex?.projects ?? featuredIndex?.featured_projects ?? [];
  for (const project of featuredEntries) {
    if (isHidden(project)) continue;
    routes.push({
      path: `/featured-projects/${project.id}`,
      title: `${project.title} | Abhishek Vasudev — iOS Developer`,
      description: project.description ?? project.excerpt ?? DEFAULT_DESCRIPTION,
      url: `/featured-projects/${project.id}`,
      type: "article",
    });
  }

  return routes;
}

function injectSeo() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error("[inject-seo] dist/ not found — run vite build first.");
    process.exit(1);
  }

  const templatePath = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(templatePath)) {
    console.error("[inject-seo] dist/index.html not found — run vite build first.");
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, "utf-8");
  const routes = getRoutes();
  console.log(`[inject-seo] Injecting metadata for ${routes.length} route(s)...`);

  for (const route of routes) {
    writeRouteHtml(route.path, route, templateHtml);
  }

  console.log("[inject-seo] Done.");
}

injectSeo();
