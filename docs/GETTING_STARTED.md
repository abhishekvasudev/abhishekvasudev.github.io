# Getting Started Guide

## Quick Start

1. **Install dependencies** (from the repository root):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to http://localhost:5173

## What You'll See

- **Home** (`/`): Hero, about, latest blog posts, featured projects
- **Portfolio** (`/portfolio`): Experience, projects, skills, education
- **Blog** (`/blog`): Article list with category filtering
- **Article pages** (`/blog/[slug]`): Full post with Markdown rendering

## How the System Works

### Architecture Overview

This site uses a **static content generation system**:

```
articles/               →  build-content.mjs  →  content.generated.json  →  React App
(Markdown + JSON)          (Node.js Script)       (Generated Data)           (Vite + React)
```

### The Content Pipeline

1. **Source**: Articles are written in Markdown files located in `articles/[article-slug]/article.md`
2. **Index**: `articles/index.json` catalogs all articles
3. **Build**: `npm run build:content` (or `npm run dev`) scans the articles directory
4. **Generate**: Creates `src/content.generated.json` with all article data
5. **Import**: React app imports this JSON file at build time
6. **Render**: React components render the content

### Why This Approach?

- **Static**: No database or CMS needed
- **Fast**: Content is compiled at build time
- **Flexible**: Full control over the data structure
- **Dev Experience**: Add articles as files, see changes instantly
- **Deployable**: Works on any static host (GitHub Pages, Netlify, Vercel)

## Adding Your First Article

### Step 1: Create Article Entry

Edit `articles/index.json` and add a new entry:

```json
{
  "id": "my-first-tech-article",
  "hidden": false,
  "title": "Understanding React Hooks",
  "category": "tech",
  "author": "Abhishek Vasudev",
  "date": "2026-06-05",
  "excerpt": "A deep dive into React Hooks and when to use them",
  "tags": ["react", "javascript", "tutorial"]
}
```

### Step 2: Create Article Folder

```bash
mkdir articles/my-first-tech-article
```

### Step 3: Write the Article

Create `articles/my-first-tech-article/article.md`:

```markdown
---
title: Understanding React Hooks
category: tech
author: Abhishek Vasudev
date: 2026-06-05
excerpt: A deep dive into React Hooks and when to use them
tags: [react, javascript, tutorial]
---

# Understanding React Hooks

React Hooks revolutionized how we write components...

## useState Hook

The most basic hook for managing state...

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook

For side effects and lifecycle management...
```

### Step 4: Rebuild Content

If the dev server is running, just save your files. Otherwise:

```bash
npm run build:content
```

### Step 5: Check Your Browser

Your new article will appear on the blog page instantly!

### Hiding an Article

Set `"hidden": true` in `articles/index.json` to keep a draft off the blog and home page without deleting it — same pattern as featured projects:

```json
{
  "id": "my-draft-post",
  "hidden": true,
  "title": "Work in Progress",
  ...
}
```

Rebuild content after changing the flag (`npm run build:content`, or save while the dev server is running).

## Adding Images to Articles

Store images in an `assets/` folder next to `article.md`:

```bash
articles/my-first-tech-article/
├── article.md
└── assets/
    ├── hero-image.jpg
    └── diagram.png
```

Reference them in markdown using the article id and `assets/` path:

```markdown
![React Hooks Diagram](/articles/my-first-tech-article/assets/diagram.png)
```

Or with a relative path from `article.md`:

```markdown
![Hero image](./assets/hero-image.jpg)
```

### How assets reach the site

`npm run build:content` (also run automatically before `dev` and `build`) copies each `articles/[id]/assets/` folder into `public/articles/[id]/assets/`. Vite then includes those in `dist/` when you build for production.

You only maintain files under `articles/[id]/assets/` — do not add blog images directly under `public/` or `dist/`; those copies are generated.

### Image with caption

Wrap a single image and its description in a `[figure]` block:

```markdown
[figure]
![Aberystwyth town](/articles/my-post/assets/town.jpeg)
Aberystwyth town
[/figure]
```

The line after the image(s) becomes the caption shown below. You can include multiple images with one shared caption:

```markdown
[figure]
![Steve Jobs Theatre](/articles/my-post/assets/theater.png)
![F1 screening](/articles/my-post/assets/f1-screening.png)
I was lucky to get tickets for a special prescreening of the **F1 movie** at the Steve Jobs Theatre.
[/figure]
```

### Gallery with optional captions

Use `[gallery]` for a 2-column grid. Plain images work as before; wrap any item in `[figure]` to add a caption:

```markdown
[gallery]
[figure]
![June 8 pic 3](/articles/my-post/assets/june-8-3.png)
With Apple Design Award
[/figure]
![June 8 pic 4](/articles/my-post/assets/june-8-4.png)
[/gallery]
```

## Categories and Tags

### Current Categories

- `tech` - Technical articles and tutorials
- `lifestyle` - Personal growth, productivity, career

### Adding New Categories

Use a new category name in the article entry in `articles/index.json`. The system automatically:
- Creates a new filter button
- Updates category counts
- Adds it to the facets

Example in `articles/index.json`:

```json
{
  "id": "my-post",
  "category": "productivity",
  ...
}
```

The next time you build, "productivity" will appear as a filter option!

### Using Tags

Tags are flexible labels for cross-cutting topics:

```yaml
tags: [javascript, tutorial, beginners]
```

Tags appear:
- On article cards
- At the bottom of article detail pages
- In the search index (future feature)

## Project Structure Explained

```
./                                 # Repository root
├── articles/                      # Blog content source
│   ├── index.json                 # Catalog (hidden flag lives here)
│   └── [article-slug]/
│       ├── article.md
│       └── assets/                # Article images
│
├── featured-projects/             # Optional home-page case studies
│   ├── index.json
│   └── [project-slug]/project.md
│
├── docs/                          # Documentation
│   ├── README.md
│   ├── GETTING_STARTED.md         # This file
│   ├── FILE_STRUCTURE.md
│   ├── EXTENDING.md
│   └── PROJECT_SUMMARY.md
│
├── public/                        # Static assets (PDFs, profile images)
│   ├── 404.html                   # GitHub Pages SPA fallback
│   └── articles/                  # Generated from articles/*/assets (gitignored)
│
├── scripts/
│   └── build-content.mjs          # Content pipeline
│
├── src/
│   ├── components/                # UI components
│   ├── data/portfolio.ts          # Portfolio page data
│   ├── lib/                       # articleUtils, experienceUtils
│   ├── pages/                     # Route pages
│   ├── styles/index.css
│   ├── App.tsx
│   ├── content.types.ts
│   └── content.generated.json     # Generated (gitignored)
│
├── .github/workflows/deploy.yml   # GitHub Pages CI
├── index.html
├── package.json
└── vite.config.ts
```

## Available NPM Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Building
npm run build:content    # Regenerate content.generated.json
npm run build           # Full production build (dist/)

# Preview
npm run preview         # Preview production build locally
```

## Customization Ideas

### 1. Update portfolio content

Edit `src/data/portfolio.ts` — profile, experience, projects, skills, education, achievements.

### 2. Update home page sections

- `src/components/home/HeroSection.tsx`
- `src/components/home/AboutMeSection.tsx`
- `src/components/home/InsightsSection.tsx`
- `src/components/home/FeaturedProjectsSection.tsx`

### 3. Change site styling

Global theme and article typography: `src/styles/index.css` (Tailwind CSS 4).

### 4. Add social links

Update `profile.social` in `src/data/portfolio.ts` and `src/components/Header.tsx` if needed.

## Deployment

### GitHub Pages (configured)

This repo deploys automatically on push to `master` via `.github/workflows/deploy.yml`.

For manual builds:

```bash
npm run build
# Upload dist/ or let CI handle it
```

For a project site (not user/org root), set base path when building:

```bash
BASE_URL=/your-repo-name/ npm run build
```

### Netlify / Vercel

- Build command: `npm run build`
- Publish directory: `dist`

## Next Steps

1. **Customize portfolio data** in `src/data/portfolio.ts`
2. **Add or edit articles** under `articles/`
3. **Add featured projects** under `featured-projects/` (optional)
4. **Push to `master`** to deploy via GitHub Actions

## Troubleshooting

### "Module not found: content.generated.json"

Run `npm run build:content` first to generate the content file.

### Articles not showing up

1. Check that the article is listed in `articles/index.json`
2. Verify the article folder name matches the `id` in index.json
3. Ensure `article.md` exists in the article folder
4. Run `npm run build:content` to regenerate

### Dev server not hot-reloading

Restart the dev server:
```bash
# Stop with Ctrl+C
npm run dev
```

## Questions?

Check the full [README.md](./README.md) for comprehensive documentation!

---

Happy blogging! 🚀
