import { useRef, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import SectionHeader from "../components/layout/SectionHeader";
import SEO from "../components/SEO";
import type { ArticleIndex, SiteContent } from "../content.types";

interface BlogPageProps {
  content: SiteContent;
}

export default function BlogPage({ content }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ArticleIndex[] | null>(null);
  const fuseRef = useRef<InstanceType<typeof import("fuse.js").default<ArticleIndex>> | null>(null);

  const categoryArticles =
    selectedCategory === "all"
      ? content.articles
      : content.articles.filter((a) => a.category === selectedCategory);

  const filteredArticles = searchResults ?? categoryArticles;

  async function handleSearchFocus() {
    if (!fuseRef.current) {
      const Fuse = (await import("fuse.js")).default;
      fuseRef.current = new Fuse(content.articles, {
        keys: ["title", "excerpt", "description", "tags"],
        threshold: 0.35,
      });
    }
  }

  function handleSearchChange(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setSearchResults(null);
      return;
    }
    if (!fuseRef.current) return;
    setSearchResults(fuseRef.current.search(value).map((result: { item: ArticleIndex }) => result.item));
  }

  const filterButtonClass = (isActive: boolean) => {
    const base = "px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all active:scale-[0.98]";
    return isActive
      ? `${base} btn-champagne font-bold`
      : `${base} font-mono border border-zinc-800 text-zinc-400 hover:border-gold-500/40 hover:text-zinc-200`;
  };

  return (
    <>
      <SEO
        title="Blog | Abhishek Vasudev — iOS & Swift Developer"
        description="Articles on iOS development, Swift, SwiftUI, and software engineering by Abhishek Vasudev, Senior iOS Engineer."
        url="/blog"
      />

      <div className="pt-36 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="max-w-6xl mx-auto mb-12">
          <SectionHeader
            eyebrow="code · life · everything in between"
            title="Blog Archive"
            as="h1"
          />
          <p className="text-zinc-400 mt-6 max-w-2xl font-light leading-relaxed">
            Hot takes, slow reads, zero release notes.
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3 mb-10">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mr-2">Filter:</span>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={filterButtonClass(selectedCategory === "all")}
          >
            All ({content.articles.length})
          </button>
          {content.facets.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`${filterButtonClass(selectedCategory === cat)} capitalize`}
            >
              {cat} ({content.stats.by_category[cat] || 0})
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mb-10">
          <input
            type="search"
            value={query}
            onFocus={handleSearchFocus}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="w-full max-w-md px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-white/10 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-gold-500/40"
          />
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-2xl border border-white/5">
            <p className="text-zinc-500 text-lg font-light">No articles found in this category.</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
