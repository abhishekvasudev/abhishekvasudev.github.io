# Portfolio + Blog Website

A modern portfolio and blog site built with React, TypeScript, Vite, and Tailwind CSS. The project lives at the **repository root** (not in a `test/` subfolder).

## Features

- **Home page** — Hero, about, insights (latest posts), featured projects
- **Portfolio page** (`/portfolio`) — Experience, projects, skills, education
- **Blog system** — Markdown articles with frontmatter, categories, and tags
- **Rich article content** — Cover images, `[figure]`, `[gallery]`, and `[youtube:ID]` shortcodes
- **Category filtering** — Filter blog posts by category
- **GitHub Pages deploy** — Automated via `.github/workflows/deploy.yml`

## Project Structure

```
abhishekvasudev.github.io/          # Repository root
├── articles/                         # Blog content source
│   ├── index.json                    # Article catalog (includes hidden flag)
│   └── [article-slug]/
│       ├── article.md
│       └── assets/                   # Images for this article
├── featured-projects/                # Optional featured project case studies
│   ├── index.json
│   └── [project-slug]/project.md
├── docs/                             # Documentation (this folder)
├── public/                           # Static assets (PDFs, profile images, 404.html)
├── scripts/
│   └── build-content.mjs             # Content pipeline
├── src/
│   ├── components/
│   ├── data/portfolio.ts             # Portfolio page content
│   ├── lib/                          # Utilities (articleUtils, experienceUtils)
│   ├── pages/
│   ├── styles/index.css
│   ├── content.types.ts
│   └── content.generated.json        # Auto-generated (do not edit)
├── index.html
├── package.json
└── vite.config.ts
```

## How It Works

1. **Articles** are Markdown files under `articles/[slug]/`
2. **`articles/index.json`** catalogs posts; use `"hidden": true` to draft without publishing
3. **`npm run build:content`** syncs `assets/` → `public/articles/` and generates `src/content.generated.json`
4. **Vite** builds the React app; `public/` is copied into `dist/`

## Getting Started

From the repository root:

```bash
npm install
npm run dev
```

Open http://localhost:5173

### Production build

```bash
npm run build
```

Output is in `dist/`.

## Adding a New Article

### 1. Add entry to `articles/index.json`

```json
{
  "id": "my-new-article",
  "hidden": false,
  "title": "My New Article",
  "category": "tech",
  "author": "Abhishek Vasudev",
  "date": "2026-06-05",
  "excerpt": "A short description",
  "tags": ["javascript", "tutorial"]
}
```

### 2. Create content

```bash
mkdir -p articles/my-new-article/assets
```

Create `articles/my-new-article/article.md` with frontmatter and Markdown body.

### 3. Images

Store images in `articles/my-new-article/assets/` and reference them:

```markdown
![Diagram](/articles/my-new-article/assets/diagram.png)
```

Or use `./assets/diagram.png` (rewritten at build time).

See [GETTING_STARTED.md](./GETTING_STARTED.md) for `[figure]`, `[gallery]`, and `[youtube:...]` shortcodes.

### 4. Rebuild

```bash
npm run build:content
```

In dev mode, `npm run dev` runs this automatically.

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/portfolio` | Full portfolio / CV |
| `/blog` | Blog archive |
| `/blog/:slug` | Article detail |
| `/featured-projects/:slug` | Featured project detail |

## Customization

| What | Where |
|------|--------|
| Portfolio copy, experience, skills | `src/data/portfolio.ts` |
| Site navigation | `src/components/Header.tsx` |
| Meta tags, SPA redirect script | `index.html` |
| Global styles | `src/styles/index.css` |

## Deployment (GitHub Pages)

The repo includes `.github/workflows/deploy.yml`:

- Triggers on push to `master`
- Runs `npm ci` and `npm run build`
- Publishes `dist/` to GitHub Pages

For a project site at `username.github.io/repo-name/`, set `BASE_URL`:

```bash
BASE_URL=/repo-name/ npm run build
```

## Tech Stack

- React 19, TypeScript, Vite 6
- Tailwind CSS 4, React Router 7
- unified / remark / rehype (Markdown)
- rehype-highlight (code blocks)

## Documentation

| Doc | Purpose |
|-----|---------|
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Step-by-step guide |
| [FILE_STRUCTURE.md](./FILE_STRUCTURE.md) | Full file tree |
| [EXTENDING.md](./EXTENDING.md) | Optional features (search, RSS, etc.) |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Quick overview |

## License

MIT — use as a template for your own site.
