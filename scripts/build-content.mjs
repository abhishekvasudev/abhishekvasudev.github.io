#!/usr/bin/env node
// Build-time content pipeline for portfolio+blog
// Reads articles/ and featured-projects/ → src/content.generated.json

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const ARTICLES_DIR = path.join(REPO_ROOT, "articles");
const FEATURED_PROJECTS_DIR = path.join(REPO_ROOT, "featured-projects");
const PUBLIC_ARTICLES_DIR = path.join(REPO_ROOT, "public", "articles");
const OUTPUT_PATH = path.resolve(__dirname, "..", "src", "content.generated.json");

const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
const ARTICLE_ASSETS_DIR = "assets";

function log(...args) {
  console.log("[build-content]", ...args);
}

function isHidden(entry) {
  return entry.hidden === true || entry.hidden === "true";
}

function articleAssetUrl(articleId, filename) {
  return `/articles/${articleId}/${ARTICLE_ASSETS_DIR}/${filename}`;
}

function resolveArticleAssetPath(value, articleId) {
  if (!value || typeof value !== "string") return value;
  if (value.startsWith("/")) return value;
  if (value.startsWith("./assets/")) {
    return articleAssetUrl(articleId, value.slice("./assets/".length));
  }
  if (value.startsWith("./")) {
    return articleAssetUrl(articleId, value.slice(2));
  }
  return value;
}

function rewriteRelativeImagePaths(body, articleId) {
  return body.replace(
    /!\[([^\]]*)\]\((\.\/[^)]+)\)/g,
    (_, alt, src) => `![${alt}](${resolveArticleAssetPath(src, articleId)})`,
  );
}

function parseFrontmatter(content) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { title: "", fields: {}, body: content };

  const [, fmText, body] = fmMatch;
  const fields = {};

  for (const line of fmText.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (value === "true") value = true;
    if (value === "false") value = false;

    fields[key] = value;
  }

  return {
    title: fields.title || "",
    fields,
    body: body.trim(),
  };
}

async function readFileIfExists(p) {
  try {
    return await fs.readFile(p, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") return null;
    throw err;
  }
}

async function syncArticleAssets(articleIds) {
  await fs.rm(PUBLIC_ARTICLES_DIR, { recursive: true, force: true });

  for (const id of articleIds) {
    const assetsDir = path.join(ARTICLES_DIR, id, ARTICLE_ASSETS_DIR);
    let files = [];

    try {
      files = await fs.readdir(assetsDir);
    } catch {
      continue;
    }

    const images = files.filter((file) => IMAGE_EXT.test(file));
    if (images.length === 0) continue;

    const destDir = path.join(PUBLIC_ARTICLES_DIR, id, ARTICLE_ASSETS_DIR);
    await fs.mkdir(destDir, { recursive: true });

    for (const file of images) {
      await fs.copyFile(path.join(assetsDir, file), path.join(destDir, file));
    }

    log(`Synced ${images.length} asset(s) → public/articles/${id}/${ARTICLE_ASSETS_DIR}/`);
  }
}

async function loadArticles() {
  const indexPath = path.join(ARTICLES_DIR, "index.json");
  const rawIndex = await readFileIfExists(indexPath);

  if (!rawIndex) {
    log("No articles/index.json found, returning empty array");
    return [];
  }

  const index = JSON.parse(rawIndex);
  const entries = index.articles || [];
  const results = [];

  for (const entry of entries) {
    if (isHidden(entry)) {
      log(`Skipping hidden article: ${entry.id}`);
      continue;
    }

    const articleDir = path.join(ARTICLES_DIR, entry.id);
    const articlePath = path.join(articleDir, "article.md");
    const content = await readFileIfExists(articlePath);

    if (!content) {
      log(`WARN: article.md not found for ${entry.id}`);
      continue;
    }

    const parsed = parseFrontmatter(content);

    let images = [];
    try {
      const assetsDir = path.join(articleDir, ARTICLE_ASSETS_DIR);
      const files = await fs.readdir(assetsDir);
      images = files
        .filter((f) => IMAGE_EXT.test(f))
        .map((file) => articleAssetUrl(entry.id, file));
    } catch {
      images = [];
    }

    const cover = resolveArticleAssetPath(
      parsed.fields.cover || entry.cover || "",
      entry.id,
    );

    results.push({
      id: entry.id,
      title: parsed.title || entry.title,
      category: parsed.fields.category || entry.category || "tech",
      author: parsed.fields.author || entry.author || "Unknown",
      date: parsed.fields.date || entry.date || new Date().toISOString().split("T")[0],
      excerpt: parsed.fields.excerpt || entry.excerpt || "",
      cover,
      body: rewriteRelativeImagePaths(parsed.body, entry.id),
      images,
      slug: entry.id,
    });
  }

  return results.sort((a, b) => new Date(b.date) - new Date(a.date));
}

async function loadFeaturedProjects() {
  const indexPath = path.join(FEATURED_PROJECTS_DIR, "index.json");
  const rawIndex = await readFileIfExists(indexPath);

  if (!rawIndex) {
    log("No featured-projects/index.json found, returning empty array");
    return [];
  }

  const index = JSON.parse(rawIndex);
  const entries = index.projects || [];
  const results = [];

  for (const entry of entries) {
    if (isHidden(entry)) {
      log(`Skipping hidden featured project: ${entry.id}`);
      continue;
    }

    const projectDir = path.join(FEATURED_PROJECTS_DIR, entry.id);
    const projectPath = path.join(projectDir, "project.md");
    const content = await readFileIfExists(projectPath);

    if (!content) {
      log(`WARN: project.md not found for ${entry.id}`);
      continue;
    }

    const parsed = parseFrontmatter(content);

    if (isHidden(parsed.fields)) {
      log(`Skipping hidden featured project (frontmatter): ${entry.id}`);
      continue;
    }

    let image = parsed.fields.image || entry.image || "";
    if (!image) {
      try {
        const files = await fs.readdir(projectDir);
        const cover = files.find((f) => /^cover\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f));
        if (cover) {
          image = `/featured-projects/${entry.id}/${cover}`;
        }
      } catch {
        // no project directory
      }
    }

    const technologies = parsed.fields.technologies || entry.technologies || [];

    results.push({
      id: entry.id,
      title: parsed.title || entry.title,
      subtitle: parsed.fields.subtitle || entry.subtitle || "",
      description: parsed.fields.description || entry.description || "",
      technologies: Array.isArray(technologies) ? technologies : [],
      link: parsed.fields.link || entry.link || "",
      image,
      sortOrder: Number(parsed.fields.sortOrder ?? entry.sortOrder ?? 0),
      body: parsed.body,
      slug: entry.id,
    });
  }

  return results.sort((a, b) => a.sortOrder - b.sortOrder);
}

async function main() {
  log("Building content...");

  const indexPath = path.join(ARTICLES_DIR, "index.json");
  const rawIndex = await readFileIfExists(indexPath);
  const articleIds = rawIndex
    ? (JSON.parse(rawIndex).articles || []).map((entry) => entry.id)
    : [];

  await syncArticleAssets(articleIds);

  const articles = await loadArticles();
  const featuredProjects = await loadFeaturedProjects();
  log(`Loaded ${articles.length} articles, ${featuredProjects.length} featured projects`);

  const categories = [...new Set(articles.map((a) => a.category))].sort();
  const tags = [...new Set(articles.flatMap((a) => a.tags || []))].sort();

  const output = {
    generated_at: new Date().toISOString(),
    articles,
    featured_projects: featuredProjects,
    facets: {
      categories,
      tags,
    },
    stats: {
      total_articles: articles.length,
      total_featured_projects: featuredProjects.length,
      by_category: Object.fromEntries(
        categories.map((cat) => [cat, articles.filter((a) => a.category === cat).length])
      ),
    },
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf8");
  log(`Wrote ${OUTPUT_PATH}`);
  log(`Summary: ${output.stats.total_articles} articles, ${output.stats.total_featured_projects} featured projects`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error("[build-content] Fatal:", err);
    process.exit(1);
  });
}
