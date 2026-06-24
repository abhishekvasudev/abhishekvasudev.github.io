import { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

interface FigureImage {
  src: string;
  alt: string;
}

interface ArticleFigureProps {
  images: FigureImage[];
  caption?: string;
}

function FigureCaption({ caption }: { caption: string }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    async function processCaption() {
      const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(caption);

      setHtml(String(result).replace(/^<p>|<\/p>$/g, ""));
    }

    processCaption();
  }, [caption]);

  if (!caption.trim()) return null;

  return <figcaption dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function ArticleFigure({ images, caption }: ArticleFigureProps) {
  if (images.length === 0) return null;

  const multi = images.length > 1;

  return (
    <figure className={`article-figure${multi ? " article-figure--multi" : ""}`}>
      {multi ? (
        <div className="article-figure-images">
          {images.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />
          ))}
        </div>
      ) : (
        <img src={images[0].src} alt={images[0].alt} loading="lazy" />
      )}
      {caption && <FigureCaption caption={caption} />}
    </figure>
  );
}
