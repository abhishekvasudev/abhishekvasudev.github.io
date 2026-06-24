import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import SectionHeader from "../components/layout/SectionHeader";
import type { SiteContent } from "../content.types";

interface BlogPageProps {
  content: SiteContent;
}

export default function BlogPage({ content }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredArticles =
    selectedCategory === "all"
      ? content.articles
      : content.articles.filter((a) => a.category === selectedCategory);

  const filterButtonClass = (isActive: boolean) => {
    const base = "px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all active:scale-[0.98]";
    return isActive
      ? `${base} btn-champagne font-bold`
      : `${base} font-mono border border-zinc-800 text-zinc-400 hover:border-gold-500/40 hover:text-zinc-200`;
  };

  return (
    <main className="pt-36 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="max-w-6xl mx-auto mb-12">
        <SectionHeader
          eyebrow="code · life · everything in between"
          title="Blog Archive"
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
    </main>
  );
}
