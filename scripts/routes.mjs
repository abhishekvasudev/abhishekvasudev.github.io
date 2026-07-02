/** Single source of truth for all public routes. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_URL,
  absoluteUrl,
} from "./site-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

function readJson(relativePath) {
  const fullPath = path.join(REPO_ROOT, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
}

function isHidden(entry) {
  return entry?.hidden === true || entry?.hidden === "true";
}

function getVisibleArticles() {
  const index = readJson("articles/index.json");
  return (index?.articles ?? []).filter((article) => !isHidden(article));
}

function getVisibleFeaturedProjects() {
  const index = readJson("featured-projects/index.json");
  if (!index) return [];
  const entries = index.projects ?? index.featured_projects ?? [];
  return entries.filter((project) => !isHidden(project));
}

/** All crawlable route paths (extensionless, no trailing slash). */
export function getPublicRoutes() {
  const articleRoutes = getVisibleArticles().map((article) => `/blog/${article.id}`);
  const projectRoutes = getVisibleFeaturedProjects().map(
    (project) => `/featured-projects/${project.id}`,
  );

  return ["/", "/portfolio", "/blog", ...articleRoutes, ...projectRoutes];
}

/** Route metadata for sitemap, RSS, and SEO injection. */
export function getRouteMeta() {
  const routes = [
    {
      path: "/",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      type: "website",
    },
    {
      path: "/portfolio",
      title: "Portfolio | Abhishek Vasudev — Senior iOS Engineer",
      description:
        "Professional portfolio of Abhishek Vasudev — Senior iOS Engineer specializing in Swift, SwiftUI, and scalable mobile architecture.",
      type: "profile",
    },
    {
      path: "/blog",
      title: "Blog | Abhishek Vasudev — iOS & Swift Developer",
      description:
        "Articles on iOS development, Swift, SwiftUI, and software engineering by Abhishek Vasudev, Senior iOS Engineer.",
      type: "website",
    },
  ];

  for (const article of getVisibleArticles()) {
    routes.push({
      path: `/blog/${article.id}`,
      title: `${article.title} | Abhishek Vasudev`,
      description: article.description ?? article.excerpt ?? DEFAULT_DESCRIPTION,
      type: "article",
      date: article.date,
      updated: article.updated ?? article.date,
      cover: article.cover,
      article,
    });
  }

  for (const project of getVisibleFeaturedProjects()) {
    routes.push({
      path: `/featured-projects/${project.id}`,
      title: `${project.title} | Abhishek Vasudev — iOS Developer`,
      description: project.description ?? project.excerpt ?? DEFAULT_DESCRIPTION,
      type: "article",
    });
  }

  return routes;
}

export function getArticleLastmod(slug) {
  const article = getVisibleArticles().find((entry) => entry.id === slug);
  if (!article) return null;
  return article.updated ?? article.date ?? null;
}

export function getLatestContentDate() {
  const dates = getVisibleArticles()
    .map((article) => article.updated ?? article.date)
    .filter(Boolean);
  if (dates.length === 0) return new Date().toISOString().split("T")[0];
  return dates.sort().at(-1);
}

export { SITE_URL, absoluteUrl };
