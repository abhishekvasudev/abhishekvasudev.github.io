# Extending the System

This guide shows you how to add new features and capabilities to your portfolio+blog site.

## Table of Contents

1. [Adding Search](#adding-search)
2. [Adding Reading Time](#adding-reading-time)
3. [Adding Related Articles](#adding-related-articles)
4. [Adding RSS Feed](#adding-rss-feed)
5. [Adding Dark Mode](#adding-dark-mode)
6. [Adding Multiple Authors](#adding-multiple-authors)
7. [Adding Social Sharing](#adding-social-sharing)
8. [Adding Analytics](#adding-analytics)

---

## Adding Search

### 1. Fuse.js is already installed

`fuse.js` is listed in `package.json`. You can import it directly in a search component.

### 2. Create a search component

Create `src/components/SearchBar.tsx`:

```tsx
import { useState } from "react";
import Fuse from "fuse.js";
import type { Article } from "../content.types";

interface SearchBarProps {
  articles: Article[];
  onResults: (results: Article[]) => void;
}

export default function SearchBar({ articles, onResults }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const fuse = new Fuse(articles, {
    keys: ["title", "excerpt", "body", "tags"],
    threshold: 0.3,
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    if (!value) {
      onResults(articles);
      return;
    }
    const results = fuse.search(value).map(result => result.item);
    onResults(results);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search articles..."
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
    />
  );
}
```

### 3. Add to BlogPage

Update `src/pages/BlogPage.tsx`:

```tsx
import SearchBar from "../components/SearchBar";

// Inside component:
const [searchResults, setSearchResults] = useState(content.articles);

// Use searchResults instead of filteredArticles
```

---

## Adding Reading Time

Reading time is **already implemented** at runtime via `getReadingTimeMinutes()` in `src/lib/articleUtils.ts` and shown on article cards and detail pages.

To persist it in generated JSON instead, add to `scripts/build-content.mjs`:

```js
// Example: add reading_time when pushing article objects
reading_time: Math.max(1, Math.ceil(parsed.body.split(/\s+/).length / 200)),
```

And extend `Article` in `src/content.types.ts` if you want it in `content.generated.json`.

---

## Adding Related Articles

### 1. Update build script

In `scripts/build-content.mjs`, add a function:

```js
function findRelatedArticles(article, allArticles, maxResults = 3) {
  const related = allArticles
    .filter(a => a.id !== article.id)
    .map(a => ({
      article: a,
      score: calculateSimilarity(article, a)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(r => r.article.id);
  
  return related;
}

function calculateSimilarity(a1, a2) {
  let score = 0;
  
  // Same category = +3 points
  if (a1.category === a2.category) score += 3;
  
  // Shared tags = +1 per tag
  const sharedTags = a1.tags.filter(t => a2.tags.includes(t));
  score += sharedTags.length;
  
  return score;
}

// In loadArticles():
results.forEach(article => {
  article.related = findRelatedArticles(article, results);
});
```

### 2. Update types

```ts
export interface Article {
  // ... existing fields
  related: string[];
}
```

### 3. Display on article page

```tsx
{article.related.length > 0 && (
  <section className="mt-12">
    <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
    <div className="grid gap-4 md:grid-cols-3">
      {article.related.map(id => {
        const relatedArticle = content.articles.find(a => a.id === id);
        return relatedArticle && <ArticleCard article={relatedArticle} />;
      })}
    </div>
  </section>
)}
```

---

## Adding RSS Feed

### 1. Create RSS generation script

Create `scripts/generate-rss.mjs`:

```js
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateRSS() {
  const contentPath = path.resolve(__dirname, "..", "src", "content.generated.json");
  const content = JSON.parse(await fs.readFile(contentPath, "utf8"));
  
  const siteUrl = "https://yoursite.com";
  const items = content.articles.map(article => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${siteUrl}/blog/${article.slug}</link>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/blog/${article.slug}</guid>
    </item>
  `).join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Abhishek Vasudev Blog</title>
    <link>${siteUrl}</link>
    <description>Tech and lifestyle articles</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  await fs.writeFile(
    path.resolve(__dirname, "..", "public", "rss.xml"),
    rss
  );
}

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

generateRSS();
```

### 2. Add to build script

In `package.json`:

```json
"scripts": {
  "build": "npm run build:content && npm run build:rss && tsc --noEmit && vite build",
  "build:rss": "node scripts/generate-rss.mjs"
}
```

---

## Adding Dark Mode

### 1. Create theme context

Create `src/lib/ThemeContext.tsx`:

```tsx
import { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as Theme) || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### 2. Wrap app

In `src/main.tsx`:

```tsx
import { ThemeProvider } from "./lib/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
```

### 3. Add toggle button

In `src/components/Header.tsx`:

```tsx
import { useTheme } from "../lib/ThemeContext";

// Inside component:
const { theme, toggleTheme } = useTheme();

<button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100">
  {theme === "light" ? "🌙" : "☀️"}
</button>
```

### 4. Update styles

Add dark mode variants to all components:

```tsx
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
```

---

## Adding Multiple Authors

### 1. Create authors data

Create `articles/authors.json`:

```json
{
  "authors": {
    "abhishek": {
      "name": "Abhishek Vasudev",
      "bio": "Software Engineer",
      "avatar": "/avatars/abhishek.jpg",
      "social": {
        "twitter": "@abhishek",
        "github": "abhishek"
      }
    }
  }
}
```

### 2. Update build script

Load authors in `build-content.mjs`:

```js
const authorsData = JSON.parse(
  await fs.readFile(path.join(ARTICLES_DIR, "authors.json"), "utf8")
);

// In article processing:
const authorInfo = authorsData.authors[article.author] || null;
results.push({
  // ... existing fields
  author_info: authorInfo,
});
```

### 3. Display author info

```tsx
{article.author_info && (
  <div className="flex items-center gap-3 mt-6">
    <img
      src={article.author_info.avatar}
      alt={article.author_info.name}
      className="w-12 h-12 rounded-full"
    />
    <div>
      <div className="font-medium">{article.author_info.name}</div>
      <div className="text-sm text-gray-600">{article.author_info.bio}</div>
    </div>
  </div>
)}
```

---

## Adding Social Sharing

### 1. Create sharing component

Create `src/components/ShareButtons.tsx`:

```tsx
interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  return (
    <div className="flex gap-3">
      <span className="text-sm font-medium text-gray-700">Share:</span>
      {Object.entries(shareUrls).map(([platform, shareUrl]) => (
        <a
          key={platform}
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 capitalize"
        >
          {platform}
        </a>
      ))}
    </div>
  );
}
```

### 2. Add to article page

```tsx
<ShareButtons
  url={`https://yoursite.com/blog/${article.slug}`}
  title={article.title}
/>
```

---

## Adding Analytics

### 1. Google Analytics

Add to `index.html` in `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Track page views

Create `src/lib/analytics.ts`:

```ts
export function trackPageView(url: string) {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", "G-XXXXXXXXXX", {
      page_path: url,
    });
  }
}
```

Use in App.tsx:

```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./lib/analytics";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  // ... rest of component
}
```

---

## More Ideas

### Comments System
- Use [Disqus](https://disqus.com/)
- Use [utterances](https://utteranc.es/) (GitHub issues)
- Build your own with a backend

### Newsletter
- Integrate [Mailchimp](https://mailchimp.com/)
- Use [ConvertKit](https://convertkit.com/)
- Add a signup form component

### Code Syntax Highlighting Themes
- Already using `rehype-highlight`
- Import a different highlight.js theme in your CSS
- Example: `import 'highlight.js/styles/github-dark.css';`

### Table of Contents
- Parse headings from article markdown
- Generate TOC with anchor links
- Make it sticky on scroll

### Progressive Web App (PWA)
- Add `vite-plugin-pwa`
- Create `manifest.json`
- Add service worker

---

## Questions?

These are starting points for extending the site at the **repository root**. Paths like `src/` and `scripts/` are relative to that root, not a `test/` folder.
