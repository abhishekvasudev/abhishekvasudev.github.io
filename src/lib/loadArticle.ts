import type { ArticleDetail } from "../content.types";

const cache = new Map<string, ArticleDetail>();

declare global {
  // Populated by scripts/prerender.mjs during SSR.
  var __PRERENDER_ARTICLES__: Record<string, ArticleDetail> | undefined;
}

export function readBootstrapArticle(slug: string): ArticleDetail | null {
  if (typeof document === "undefined") return null;
  const el = document.getElementById("article-bootstrap");
  if (!el?.textContent) return null;
  try {
    const data = JSON.parse(el.textContent) as ArticleDetail;
    return data.slug === slug ? data : null;
  } catch {
    return null;
  }
}

export function loadArticleDetailSync(slug: string): ArticleDetail | null {
  if (import.meta.env.SSR && globalThis.__PRERENDER_ARTICLES__) {
    return globalThis.__PRERENDER_ARTICLES__[slug] ?? null;
  }
  return null;
}

export async function loadArticleDetail(slug: string): Promise<ArticleDetail | null> {
  if (cache.has(slug)) return cache.get(slug)!;

  const bootstrapped = readBootstrapArticle(slug);
  if (bootstrapped) {
    cache.set(slug, bootstrapped);
    return bootstrapped;
  }

  const response = await fetch(`/articles/${slug}/article.json`);
  if (!response.ok) return null;
  const data = (await response.json()) as ArticleDetail;
  cache.set(slug, data);
  return data;
}

export function prefetchArticleDetail(slug: string) {
  void loadArticleDetail(slug);
}
