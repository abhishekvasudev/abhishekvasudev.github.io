import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import MarkdownContent from "../components/MarkdownContent";
import ReturnToTop from "../components/home/ReturnToTop";
import SEO from "../components/SEO";
import { getArticleCover } from "../lib/articleUtils";
import {
  loadArticleDetail,
  loadArticleDetailSync,
  readBootstrapArticle,
} from "../lib/loadArticle";
import { articleJsonLd, absoluteUrl } from "../lib/seo";
import type { ArticleIndex, SiteContent } from "../content.types";

interface ArticleDetailPageProps {
  content: SiteContent;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function ArticleSkeleton() {
  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto animate-pulse">
      <div className="h-4 w-32 bg-zinc-800 rounded mb-12" />
      <div className="h-10 w-3/4 bg-zinc-800 rounded mb-6" />
      <div className="h-4 w-48 bg-zinc-900 rounded mb-10" />
      <div className="space-y-4">
        <div className="h-4 bg-zinc-900 rounded" />
        <div className="h-4 bg-zinc-900 rounded" />
        <div className="h-4 w-5/6 bg-zinc-900 rounded" />
      </div>
    </div>
  );
}

export default function ArticleDetailPage({ content }: ArticleDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const article = content.articles.find((a) => a.slug === slug);

  const [detail, setDetail] = useState(() => {
    if (!slug) return null;
    if (import.meta.env.SSR) return loadArticleDetailSync(slug);
    return readBootstrapArticle(slug);
  });

  const [loading, setLoading] = useState(() => !detail && Boolean(slug));

  useEffect(() => {
    if (!slug || detail) return;
    let active = true;
    setLoading(true);
    loadArticleDetail(slug).then((data) => {
      if (!active) return;
      setDetail(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug, detail]);

  if (!article) {
    return (
      <>
        <SEO
          title="Article Not Found | Abhishek Vasudev"
          description="The requested article could not be found."
          url={`/blog/${slug ?? ""}`}
          noindex
        />
        <div className="pt-36 pb-20 px-4 md:px-8 max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-medium text-white mb-4">Article Not Found</h1>
          <p className="text-zinc-400 mb-8 font-light">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            to="/blog"
            className="inline-block px-8 py-3 rounded-xl btn-champagne text-xs font-bold uppercase tracking-widest"
          >
            Back to Blog
          </Link>
        </div>
      </>
    );
  }

  if (loading || !detail) {
    return (
      <>
        <SEO
          title={`${article.title} | Abhishek Vasudev`}
          description={article.description || article.excerpt}
          url={`/blog/${article.slug}`}
          type="article"
        />
        <ArticleSkeleton />
      </>
    );
  }

  return <ArticleView article={article} detail={detail} />;
}

function ArticleView({ article, detail }: { article: ArticleIndex; detail: { bodyHtml: string } }) {
  const coverImage = getArticleCover(article);
  const readingTime = article.readingTime ?? 5;
  const articleUrl = `/blog/${article.slug}`;
  const ogImage = coverImage ? absoluteUrl(coverImage) : undefined;
  const metaDescription = article.description || article.excerpt;

  const articleSchema = articleJsonLd({
    title: article.title,
    description: metaDescription,
    date: article.date,
    updated: article.updated,
    author: article.author,
    slug: article.slug,
    image: coverImage ?? undefined,
  });

  return (
    <>
      <SEO
        title={`${article.title} | Abhishek Vasudev`}
        description={metaDescription}
        image={ogImage}
        url={articleUrl}
        type="article"
        jsonLd={articleSchema}
      />

      <article className="pt-32 pb-0">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 mb-12 text-sm text-zinc-400 hover:text-gold-300 transition-colors py-1.5 px-4 rounded-full bg-zinc-950/50 border border-white/5 hover:border-gold-500/25"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog Archive
          </Link>

          <header className="mb-14">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-gold-950/50 border border-gold-600/30 text-[10px] font-mono text-gold-300 font-semibold uppercase tracking-[0.15em]">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                <Clock className="h-3 w-3" />
                {readingTime} min read
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-tight text-white leading-[1.12] mb-6">
              {article.title}
            </h1>

            <div className="h-[2px] w-20 bg-gradient-to-r from-gold-400 to-transparent mb-6" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-mono text-zinc-500">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span className="text-zinc-700">•</span>
              <span>{article.author}</span>
            </div>

            {article.excerpt && (
              <p className="mt-8 text-xl md:text-[1.35rem] text-zinc-300 font-light leading-relaxed border-l-2 border-gold-500/40 pl-5">
                {article.excerpt}
              </p>
            )}
          </header>

          <div className="mb-16">
            <MarkdownContent html={detail.bodyHtml} content="" />
          </div>

          {article.tags && article.tags.length > 0 && (
            <footer className="pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Tags</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gold-950/40 border border-gold-600/20 text-gold-300 rounded-full text-xs font-mono uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          )}

          <ReturnToTop compact />
        </div>
      </article>
    </>
  );
}
