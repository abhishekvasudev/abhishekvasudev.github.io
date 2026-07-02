#!/usr/bin/env node
/** Compile markdown + shortcodes to static HTML for SSR/prerender. */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

function parseFigureContent(inner) {
  const trimmed = inner.trim();
  const images = [...trimmed.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map((match) => ({
    alt: match[1],
    src: match[2],
  }));
  if (images.length === 0) return null;
  const caption = trimmed.replace(/!\[[^\]]*\]\([^)]+\)\s*/g, "").trim();
  return { images, caption };
}

function parseGalleryItems(inner) {
  const items = [];
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

function parseContentSegments(content) {
  const pattern =
    /(\[youtube:[\w-]+\]|\[gallery\][\s\S]*?\[\/gallery\]|\[figure\][\s\S]*?\[\/figure\])/g;
  const segments = [];
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
        if (images.length > 0) segments.push({ type: "gallery", images });
      } else {
        const figureMatch = part.match(/^\[figure\]([\s\S]*?)\[\/figure\]$/);
        if (figureMatch) {
          const figure = parseFigureContent(figureMatch[1]);
          if (figure) segments.push({ type: "figure", ...figure });
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

async function markdownToHtml(markdown) {
  if (!markdown.trim()) return "";
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

function youtubeToHtml(videoId) {
  return `<div class="my-10 rounded-2xl overflow-hidden border border-white/10 aspect-video"><iframe class="w-full h-full" src="https://www.youtube.com/embed/${videoId}" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
}

function figureToHtml(images, caption) {
  const imgs = images
    .map(
      (img) =>
        `<img src="${img.src}" alt="${img.alt}" loading="lazy" decoding="async" class="w-full rounded-xl" />`,
    )
    .join("");
  const cap = caption ? `<figcaption class="mt-3 text-sm text-zinc-400 text-center">${caption}</figcaption>` : "";
  return `<figure class="my-10">${imgs}${cap}</figure>`;
}

function galleryToHtml(images) {
  const items = images
    .map(
      (img) =>
        `<figure><img src="${img.src}" alt="${img.alt}" loading="lazy" decoding="async" class="w-full rounded-xl" />${img.caption ? `<figcaption class="mt-2 text-xs text-zinc-500">${img.caption}</figcaption>` : ""}</figure>`,
    )
    .join("");
  return `<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4">${items}</div>`;
}

export async function compileArticleBody(markdown, options = {}) {
  let body = markdown;
  if (options.stripTitle) {
    body = body.replace(/^#\s+.+\n+/, "");
  }
  if (options.prependCover) {
    body = `![Cover image](${options.prependCover})\n\n${body}`;
  }

  const segments = parseContentSegments(body);
  const parts = [];

  for (const segment of segments) {
    if (segment.type === "markdown") {
      parts.push(await markdownToHtml(segment.content));
    } else if (segment.type === "youtube") {
      parts.push(youtubeToHtml(segment.videoId));
    } else if (segment.type === "gallery") {
      parts.push(galleryToHtml(segment.images));
    } else if (segment.type === "figure") {
      parts.push(figureToHtml(segment.images, segment.caption));
    }
  }

  return parts.join("\n");
}
