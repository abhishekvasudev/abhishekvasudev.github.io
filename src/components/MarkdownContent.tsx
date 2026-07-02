import { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { buildArticleMarkdown, parseContentSegments } from "../lib/articleUtils";
import YouTubeEmbed from "./YouTubeEmbed";
import ImageGallery from "./ImageGallery";
import ArticleFigure from "./ArticleFigure";

interface MarkdownContentProps {
  content: string;
  html?: string;
  className?: string;
  stripTitle?: boolean;
  prependCover?: string | null;
}

function MarkdownChunk({ content, className }: { content: string; className: string }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    async function processMarkdown() {
      const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(content);

      setHtml(String(result));
    }

    processMarkdown();
  }, [content]);

  if (!content.trim()) return null;

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function MarkdownContent({
  content,
  html,
  className = "article-prose",
  stripTitle = false,
  prependCover = null,
}: MarkdownContentProps) {
  if (html) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
  }

  const source = buildArticleMarkdown(content, { stripTitle, prependCover });
  const segments = parseContentSegments(source);

  if (segments.length === 1 && segments[0].type === "markdown") {
    return <MarkdownChunk content={segments[0].content} className={className} />;
  }

  return (
    <div className={className}>
      {segments.map((segment, index) => {
        if (segment.type === "youtube") {
          return (
            <YouTubeEmbed
              key={`youtube-${segment.videoId}-${index}`}
              videoId={segment.videoId}
              title="Watch my lightning talk"
            />
          );
        }

        if (segment.type === "gallery") {
          return <ImageGallery key={`gallery-${index}`} images={segment.images} />;
        }

        if (segment.type === "figure") {
          return (
            <ArticleFigure
              key={`figure-${segment.images[0]?.src ?? index}-${index}`}
              images={segment.images}
              caption={segment.caption}
            />
          );
        }

        return <MarkdownChunk key={`md-${index}`} content={segment.content} className={className} />;
      })}
    </div>
  );
}
