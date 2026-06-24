# Project Summary

## Overview

Personal portfolio and blog site for **Abhishek Vasudev**, deployed at [abhishekvasu.dev](https://www.abhishekvasu.dev). Source code lives at the **repository root** — there is no `test/` subdirectory.

## What You Have

### Pages & routes

- **`/`** — Home (hero, about, latest blog posts, featured projects)
- **`/portfolio`** — CV-style page (experience, projects, skills, education)
- **`/blog`** — Blog archive with category filters
- **`/blog/:slug`** — Individual articles
- **`/featured-projects/:slug`** — Featured project case studies (when content exists)

### Content systems

- **Blog** — `articles/` + `articles/index.json` + build pipeline
- **Portfolio** — `src/data/portfolio.ts` (experience, skills, projects, etc.)
- **Featured projects** — `featured-projects/` (optional; same pipeline pattern as articles)

### Architecture

```
articles/ + featured-projects/
        ↓  npm run build:content
src/content.generated.json
        ↓  import in React
Vite app → dist/ → GitHub Pages
```

- Static generation — no database
- TypeScript throughout
- React 19, Vite 6, Tailwind CSS 4

## Quick Start

From the repository root:

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
./
├── articles/                    # Blog posts
│   ├── index.json
│   └── [slug]/
│       ├── article.md
│       └── assets/
├── featured-projects/           # Optional case studies
├── docs/                        # Documentation
├── public/                      # Static files (images, PDFs, 404.html)
├── scripts/build-content.mjs
├── src/
│   ├── components/
│   ├── data/portfolio.ts
│   ├── lib/
│   ├── pages/
│   └── content.generated.json   # Generated
├── .github/workflows/deploy.yml
└── package.json
```

## NPM Scripts

```bash
npm run dev              # build:content + Vite dev server
npm run build:content    # Regenerate content.generated.json + sync article assets
npm run build            # Full production build → dist/
npm run preview          # Preview production build locally
```

## Blog Content Notes

- **Visibility** — `"hidden": true` in `articles/index.json` only (not frontmatter)
- **Images** — Keep under `articles/[slug]/assets/`; synced to `public/articles/` at build time
- **Shortcodes** — `[figure]`, `[gallery]`, `[youtube:VIDEO_ID]` in article Markdown

## Documentation Index

1. **[README.md](./README.md)** — Main reference
2. **[GETTING_STARTED.md](./GETTING_STARTED.md)** — Tutorials and troubleshooting
3. **[FILE_STRUCTURE.md](./FILE_STRUCTURE.md)** — Detailed file tree
4. **[EXTENDING.md](./EXTENDING.md)** — Optional features

## Deployment

Push to `master` — GitHub Actions builds and deploys `dist/` automatically (see `.github/workflows/deploy.yml`).

## Next Steps

1. Edit `src/data/portfolio.ts` for CV content
2. Add or edit posts under `articles/`
3. Optionally add `featured-projects/` entries for the home carousel
4. Commit and push to deploy
