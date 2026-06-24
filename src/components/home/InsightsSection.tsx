import { Link } from "react-router-dom";
import type { Article } from "../../content.types";
import ArticleCard from "../ArticleCard";
import SectionHeader from "../layout/SectionHeader";

interface InsightsSectionProps {
  articles: Article[];
}

export default function InsightsSection({ articles }: InsightsSectionProps) {
  const featured = [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section id="insights" className="py-20 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-28">
      <div className="flex items-end justify-between mb-12 max-w-6xl mx-auto">
        <SectionHeader eyebrow="code · life · everything in between" title="Insights" />
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap text-sm text-zinc-400 hover:text-gold-300 transition-colors font-mono uppercase tracking-wider"
        >
          View all
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {featured.length === 0 ? (
        <div className="max-w-6xl mx-auto glass-panel rounded-2xl border border-white/5 p-12 text-center">
          <p className="font-serif text-2xl text-zinc-300 mb-2">Coming Soon</p>
          <p className="text-sm text-zinc-500 font-light">New writing is on the way.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
