/** First markdown image URL in the article body, if any. */
export function getArticleCoverImage(body: string): string | null {
  const match = body.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return match?.[1] ?? null;
}

/** Estimated reading time in minutes (~200 wpm). */
export function getReadingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Remove leading H1 — title is rendered in the page header. */
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+.+\n+/, "");
}

/** Resolve the cover image for an article. */
export function getArticleCover(article: { cover?: string; body: string }): string | null {
  if (article.cover) return article.cover;
  return getArticleCoverImage(article.body);
}

/** Build markdown for rendering, optionally injecting a cover image at the top. */
export function buildArticleMarkdown(
  markdown: string,
  options: { stripTitle?: boolean; prependCover?: string | null } = {},
): string {
  let body = markdown;
  if (options.stripTitle) body = stripLeadingH1(body);
  if (options.prependCover) {
    body = `![Cover image](${options.prependCover})\n\n${body}`;
  }
  return body;
}

export type ContentSegment =
  | { type: "markdown"; content: string }
  | { type: "youtube"; videoId: string }
  | { type: "gallery"; images: Array<{ src: string; alt: string; caption: string }> }
  | { type: "figure"; images: Array<{ src: string; alt: string }>; caption: string };

function parseFigureContent(inner: string) {
  const trimmed = inner.trim();
  const images = [...trimmed.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map((match) => ({
    alt: match[1],
    src: match[2],
  }));

  if (images.length === 0) return null;

  const caption = trimmed.replace(/!\[[^\]]*\]\([^)]+\)\s*/g, "").trim();

  return { images, caption };
}

function parseGalleryItems(inner: string) {
  const items: Array<{ src: string; alt: string; caption: string }> = [];
  const itemPattern = /(\[figure\][\s\S]*?\[\/figure\]|!\[[^\]]*\]\([^)]+\))/g;

  for (const match of inner.matchAll(itemPattern)) {
    const part = match[0].trim();
    const figureMatch = part.match(/^\[figure\]([\s\S]*?)\[\/figure\]$/);
    if (figureMatch) {
      const figure = parseFigureContent(figureMatch[1]);
      if (figure) {
        items.push({
          alt: figure.images[0].alt,
          src: figure.images[0].src,
          caption: figure.caption,
        });
      }
      continue;
    }

    const imageMatch = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      items.push({ alt: imageMatch[1], src: imageMatch[2], caption: "" });
    }
  }

  return items;
}

/** Split markdown into text, YouTube embeds, galleries, and figures. */
export function parseContentSegments(content: string): ContentSegment[] {
  const pattern =
    /(\[youtube:[\w-]+\]|\[gallery\][\s\S]*?\[\/gallery\]|\[figure\][\s\S]*?\[\/figure\])/g;
  const segments: ContentSegment[] = [];
  let lastIndex = 0;

  for (const match of content.matchAll(pattern)) {
    const index = match.index ?? 0;

    if (index > lastIndex) {
      segments.push({ type: "markdown", content: content.slice(lastIndex, index) });
    }

    const part = match[0];
    const youtubeMatch = part.match(/^\[youtube:([\w-]+)\]$/);
    if (youtubeMatch) {
      segments.push({ type: "youtube", videoId: youtubeMatch[1] });
    } else {
      const galleryMatch = part.match(/^\[gallery\]([\s\S]*?)\[\/gallery\]$/);
      if (galleryMatch) {
        const images = parseGalleryItems(galleryMatch[1]);
        if (images.length > 0) {
          segments.push({ type: "gallery", images });
        }
      } else {
        const figureMatch = part.match(/^\[figure\]([\s\S]*?)\[\/figure\]$/);
        if (figureMatch) {
          const figure = parseFigureContent(figureMatch[1]);
          if (figure) {
            segments.push({ type: "figure", images: figure.images, caption: figure.caption });
          }
        }
      }
    }

    lastIndex = index + part.length;
  }

  if (lastIndex < content.length) {
    segments.push({ type: "markdown", content: content.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: "markdown", content }];
}
