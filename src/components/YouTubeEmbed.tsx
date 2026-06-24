import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export default function YouTubeEmbed({ videoId, title = "Watch on YouTube" }: YouTubeEmbedProps) {
  const [thumbSrc, setThumbSrc] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  );
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="youtube-embed group block my-10"
      aria-label={title}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50 aspect-video">
        <img
          src={thumbSrc}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          onError={() => setThumbSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 transition-opacity duration-300 group-hover:from-black/55" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 md:h-[4.5rem] md:w-[4.5rem] items-center justify-center rounded-full bg-red-600/95 shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-500">
            <Play className="h-7 w-7 fill-white text-white ml-1" />
          </div>
        </div>

        <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {title}
        </span>
      </div>
    </a>
  );
}
