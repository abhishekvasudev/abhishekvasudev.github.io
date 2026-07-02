import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Article } from "../content.types";
import { getArticleCover } from "../lib/articleUtils";
import { prefetchArticleDetail } from "../lib/loadArticle";

interface ArticleCardProps {
  article: Article;
}

const categoryGradients: Record<string, string> = {
  tech: "from-blue-950/80 via-slate-900/90 to-zinc-950",
  lifestyle: "from-amber-950/70 via-stone-900/90 to-zinc-950",
  default: "from-zinc-800/90 via-zinc-900 to-black",
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const coverImage = getArticleCover(article);
  const gradient = categoryGradients[article.category] ?? categoryGradients.default;
  const readingTime = article.readingTime ?? 5;

  return (
    <Link
      to={`/blog/${article.slug}`}
      viewTransition
      onMouseEnter={() => prefetchArticleDetail(article.slug)}
      onFocus={() => prefetchArticleDetail(article.slug)}
      className="group glass-panel border border-white/5 hover:border-gold-500/35 shadow-lg rounded-2xl overflow-hidden transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 flex h-full flex-col"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-white/5">
        {coverImage ? (
          <>
            <img
              src={coverImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        )}

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] font-mono uppercase tracking-wider text-gold-300">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-zinc-400">
            <Clock className="h-2.5 w-2.5" />
            {readingTime} min
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <time
          dateTime={article.date}
          className="font-mono text-[10px] uppercase text-gold-500 tracking-widest block font-medium"
        >
          {new Date(article.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>

        <div className="mt-3 flex items-start justify-between gap-3">
          <h2 className="font-serif text-xl font-medium leading-snug tracking-tight text-white transition-colors group-hover:text-gold-200 line-clamp-2 min-h-[3.25rem]">
            {article.title}
          </h2>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-400" />
        </div>

        <p className="mt-3 text-sm font-light leading-relaxed text-zinc-400 line-clamp-2 min-h-[2.75rem]">
          {article.excerpt || "\u00A0"}
        </p>

        <div className="mt-auto flex min-h-[1.75rem] flex-wrap gap-1.5 pt-4">
          {article.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-gold-600/15 bg-gold-950/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold-400/90"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
