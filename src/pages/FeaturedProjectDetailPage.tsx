import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import MarkdownContent from "../components/MarkdownContent";
import type { SiteContent } from "../content.types";

interface FeaturedProjectDetailPageProps {
  content: SiteContent;
}

export default function FeaturedProjectDetailPage({ content }: FeaturedProjectDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const project = content.featured_projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="pt-36 pb-20 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <h1 className="font-serif text-4xl font-medium text-white mb-4">Project Not Found</h1>
        <p className="text-zinc-400 mb-8 font-light">The project you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-xl btn-champagne text-xs font-bold uppercase tracking-widest"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-36 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
      <Link
        to="/"
        state={{ scrollTo: "featured-projects" }}
        className="group inline-flex items-center gap-2 mb-10 text-sm text-zinc-400 hover:text-gold-300 transition-colors py-1 px-3 rounded-full bg-zinc-950/40 border border-zinc-900"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Featured Projects
      </Link>

      <article className="glass-panel rounded-2xl border border-white/5 p-8 md:p-10">
        {project.image && (
          <div className="rounded-xl overflow-hidden aspect-[16/10] border border-white/10 bg-zinc-900 shadow-xl mb-8">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}

        <header className="mb-8 border-b border-white/5 pb-6">
          {project.subtitle && (
            <span className="px-3 py-1 rounded-full bg-gold-950/40 border border-gold-600/35 text-xs font-mono text-gold-300 font-semibold uppercase mb-4 inline-block">
              {project.subtitle}
            </span>
          )}
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight mb-4">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-lg text-zinc-400 font-light leading-relaxed">{project.description}</p>
          )}
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gold-950/40 border border-gold-600/20 text-gold-300 rounded-full text-xs font-mono uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl btn-champagne text-xs font-bold uppercase tracking-widest"
            >
              Visit Live Project
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </header>

        {project.body && (
          <div className="prose prose-invert prose-zinc max-w-none [&_a]:text-gold-400 [&_code]:text-gold-300 [&_code]:bg-zinc-900">
            <MarkdownContent content={project.body} />
          </div>
        )}
      </article>
    </main>
  );
}
