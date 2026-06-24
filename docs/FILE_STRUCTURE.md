# Complete File Structure

Project root: **`abhishekvasudev.github.io/`** (repository root — not `test/`).

## Project Tree

```
./
├── 📚 docs/                           # Documentation
│   ├── README.md
│   ├── GETTING_STARTED.md
│   ├── EXTENDING.md
│   ├── PROJECT_SUMMARY.md
│   └── FILE_STRUCTURE.md              # This file
│
├── 🎨 Configuration
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   ├── .gitignore
│   └── .github/workflows/deploy.yml   # GitHub Pages CI
│
├── 📝 Blog content
│   └── articles/
│       ├── index.json                 # Catalog; hidden flag per entry
│       └── [slug]/
│           ├── article.md
│           └── assets/                # Source images (synced at build)
│
├── 📝 Featured projects (optional)
│   └── featured-projects/
│       ├── index.json
│       └── [slug]/project.md
│
├── 🔧 Build
│   └── scripts/build-content.mjs
│
├── 📦 Static assets
│   └── public/
│       ├── 404.html
│       ├── CNAME
│       ├── AbhishekVasudevPortfolio.pdf
│       ├── AbhishekVasudevResume.pdf
│       ├── images/                    # Profile, project placeholders
│       └── articles/                  # Generated (gitignored)
│
└── ⚛️ React app
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── vite-env.d.ts
        ├── content.types.ts
        ├── content.generated.json     # Generated (gitignored)
        │
        ├── data/
        │   └── portfolio.ts           # CV / portfolio page content
        │
        ├── lib/
        │   ├── articleUtils.ts        # Covers, reading time, shortcode parsing
        │   └── experienceUtils.ts     # Dynamic tenure calculation
        │
        ├── hooks/
        │   └── useScrollToSection.ts
        │
        ├── pages/
        │   ├── HomePage.tsx
        │   ├── PortfolioPage.tsx
        │   ├── BlogPage.tsx
        │   ├── ArticleDetailPage.tsx
        │   ├── FeaturedProjectDetailPage.tsx
        │   └── NotFoundPage.tsx
        │
        ├── components/
        │   ├── Header.tsx
        │   ├── ArticleCard.tsx
        │   ├── MarkdownContent.tsx
        │   ├── ArticleFigure.tsx
        │   ├── ImageGallery.tsx
        │   ├── YouTubeEmbed.tsx
        │   ├── home/                    # Hero, About, Insights, Featured, ReturnToTop
        │   ├── layout/                  # Footer, SectionHeader, ScrollToTop
        │   └── portfolio/               # Profile, Experience, Sidebar, etc.
        │
        └── styles/
            └── index.css
```

## Key Directories

| Path | Purpose |
|------|---------|
| `articles/` | Blog source — edit here |
| `articles/[slug]/assets/` | Article images (single source of truth) |
| `public/` | Static files served as-is |
| `public/articles/` | **Generated** — copied from `articles/*/assets/` |
| `src/data/portfolio.ts` | Portfolio page text and structure |
| `src/content.generated.json` | **Generated** — built from articles + featured-projects |
| `dist/` | **Generated** — production build output |

## Content Pipeline

`scripts/build-content.mjs`:

1. Reads `articles/index.json` and `featured-projects/index.json`
2. Skips entries with `"hidden": true`
3. Parses Markdown frontmatter
4. Syncs `articles/[id]/assets/` → `public/articles/[id]/assets/`
5. Writes `src/content.generated.json`

Run via `npm run build:content` or automatically before `dev` / `build`.

## Article Markdown Shortcodes

| Shortcode | Purpose |
|-----------|---------|
| `[figure]...[/figure]` | Image(s) with caption |
| `[gallery]...[/gallery]` | 2-column image grid |
| `[youtube:VIDEO_ID]` | YouTube embed |

See [GETTING_STARTED.md](./GETTING_STARTED.md) for syntax examples.

## Routes (`src/App.tsx`)

| Route | Component |
|-------|-------------|
| `/` | `HomePage` |
| `/portfolio` | `PortfolioPage` |
| `/blog` | `BlogPage` |
| `/blog/:slug` | `ArticleDetailPage` |
| `/featured-projects/:slug` | `FeaturedProjectDetailPage` |
| `*` | `NotFoundPage` |

## Git Ignore (`.gitignore`)

Not committed:

- `node_modules/`
- `dist/`
- `src/content.generated.json`
- `public/articles/`
- `.tmp-pip/`
- `.DS_Store`

## Adding New Files

### New article

```bash
mkdir -p articles/my-post/assets
touch articles/my-post/article.md
# Add entry to articles/index.json
npm run build:content
```

### New page

```bash
touch src/pages/MyPage.tsx
# Add <Route> in src/App.tsx
```

## Documentation Map

| Audience | Start here |
|----------|------------|
| New to the project | [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) → [GETTING_STARTED.md](./GETTING_STARTED.md) |
| Adding features | [EXTENDING.md](./EXTENDING.md) |
| Full reference | [README.md](./README.md) |

---

**All paths in this repo are relative to the repository root.**
