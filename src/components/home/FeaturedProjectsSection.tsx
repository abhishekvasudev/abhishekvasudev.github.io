import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { FeaturedProject } from "../../content.types";
import SectionHeader from "../layout/SectionHeader";

interface FeaturedProjectsSectionProps {
  projects: FeaturedProject[];
}

export default function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const slideLeft = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    scroll("left");
  };

  const slideRight = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    scroll("right");
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden scroll-mt-28" id="featured-projects">
      <div className="flex items-end justify-between mb-12 max-w-6xl mx-auto">
        <SectionHeader eyebrow="curated portfolio" title="Featured Projects" />
        {projects.length > 0 && (
          <div className="flex gap-3 z-10">
            <button
              type="button"
              onClick={slideLeft}
              className="cursor-pointer h-12 w-12 rounded-full border border-zinc-800 bg-zinc-950/40 hover:border-gold-500 hover:text-white transition-all flex items-center justify-center text-zinc-400 active:scale-90"
              aria-label="Previous project"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={slideRight}
              className="cursor-pointer h-12 w-12 rounded-full border border-zinc-800 bg-zinc-950/40 hover:border-gold-500 hover:text-white transition-all flex items-center justify-center text-zinc-400 active:scale-90"
              aria-label="Next project"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto relative">
        {projects.length === 0 ? (
          <div className="glass-panel rounded-2xl border border-white/5 p-12 text-center">
            <p className="font-serif text-2xl text-zinc-300">Coming Soon</p>
          </div>
        ) : (
          <>
            <div className="hidden lg:grid grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="lg:hidden w-full overflow-hidden">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
              >
                {projects.map((project) => (
                  <div key={project.id} className="w-full shrink-0 snap-start px-1">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center gap-1">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="h-10 px-2 flex items-center justify-center cursor-pointer"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to project slide ${idx + 1}`}
                  >
                    <span
                      className={`h-[5px] rounded-full transition-all duration-300 ${
                        currentIndex === idx ? "w-8 bg-zinc-100" : "w-1.5 bg-zinc-700"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: FeaturedProject }) {
  const content = (
    <>
      <div className="relative aspect-[4/3] bg-zinc-900 border-b border-white/5 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {project.technologies.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-black/65 border border-white/10 text-[9px] font-mono uppercase tracking-wider text-gold-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 space-y-3">
        {project.subtitle && (
          <span className="font-mono text-[10px] uppercase text-gold-500 tracking-widest block font-medium">
            {project.subtitle}
          </span>
        )}
        <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-gold-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed font-light">
          {project.description}
        </p>
        <div className="pt-2 flex items-center justify-between text-xs font-mono font-semibold text-gold-400 group-hover:text-gold-300 transition-colors">
          <span>View Case Study</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </div>
      </div>
    </>
  );

  const className =
    "group cursor-pointer glass-panel border border-white/5 bg-zinc-950/10 hover:border-gold-500/40 shadow-lg rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 block";

  return (
    <Link to={`/featured-projects/${project.slug}`} className={className}>
      {content}
    </Link>
  );
}
