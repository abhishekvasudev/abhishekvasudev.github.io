# SEO & Prerender Pipeline

This site is a static React app deployed to **GitHub Pages** at `https://www.abhishekvasu.dev`. Every public route is prerendered at build time so crawlers and social scrapers receive full HTML without executing JavaScript.

## Site configuration

All origins and identity constants live in:

- `src/config/site.config.json` — values (single source of truth)
- `src/config/site.ts` — typed exports for the React app
- `scripts/site-config.mjs` — same values for Node build scripts

Never hard-code `abhishekvasu.dev` elsewhere.

## URL style

**Extensionless, no trailing slash** (e.g. `/blog/wwdc-2025-recap`).

Build output uses flat HTML files:

| Route | File |
|-------|------|
| `/` | `dist/index.html` |
| `/portfolio` | `dist/portfolio.html` |
| `/blog/my-post` | `dist/blog/my-post.html` |

GitHub Pages serves `path.html` for requests to `/path` when `.nojekyll` is present.

## Build pipeline

```bash
npm run build
```

Order:

1. `build:content` — markdown → `src/content.index.json` + `public/articles/*/article.json`
2. `build:assets` — favicons, OG default image, web manifest
3. `tsc --noEmit`
4. `vite build` — client bundle → `dist/`
5. `scripts/prerender.mjs` — SSR render each route, inject HTML + head tags
6. `scripts/generate-sitemap.mjs` — `sitemap.xml` + `robots.txt` with per-article `lastmod`
7. `scripts/generate-rss.mjs` — `rss.xml`
8. `scripts/verify-dist.mjs` — fail build if SEO/budget checks fail

### Prerender details

- `src/entry-server.tsx` renders `AppContent` with `MemoryRouter` (React Router 7 has no `StaticRouter`)
- React 19 + `react-helmet-async`: meta tags are extracted from SSR HTML into `<head>` (context is not populated on React 19)
- Article routes inject `<script id="article-bootstrap" type="application/json">` for hydration without refetching
- `dist/404.html` is a branded static 404 (no SPA redirect hack)

## Adding an article

1. Create `articles/my-slug/article.md` with frontmatter:

```yaml
---
title: My Post Title
category: tech
author: Abhishek Vasudev
date: 2026-01-15
updated: 2026-01-20        # optional; used for sitemap lastmod
description: ~150 char SEO description  # optional; falls back to excerpt
cover: ./assets/cover.png   # optional
excerpt: Short card summary
tags: [swift, ios]
---
```

2. Add entry to `articles/index.json` (set `"hidden": false` to publish)
3. Run `npm run build`

Supported frontmatter fields flow through: meta tags → JSON-LD → RSS → sitemap `lastmod`.

## Routes

Public routes are enumerated in `scripts/routes.mjs` (used by prerender, sitemap, RSS, verify). Hidden articles (`"hidden": true` in `articles/index.json`) are excluded.

## Verification

```bash
npm ci
npm run build
node scripts/verify-dist.mjs
```

Checks: HTML file per route, unique title/description/canonical, JSON-LD, favicons, `rss.xml`, `sitemap.xml`, `CNAME`, `.nojekyll`, JS/CSS size budgets.

## Out of scope (human)

- GitHub Pages custom domain / DNS
- Search Console sitemap submission
- Profile bio updates on LinkedIn/GitHub/X
