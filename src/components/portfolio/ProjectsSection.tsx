import { projects } from "../../data/portfolio";
import CollapsibleItem from "./CollapsibleItem";
import Section from "./Section";

export default function ProjectsSection() {
  return (
    <Section title="Projects" eyebrow="selected work">
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.title}>
            {index > 0 && <hr className="border-white/5 mb-6" />}
            <CollapsibleItem
              id={`project-${index}`}
              summary={<h3 className="text-lg font-semibold text-white">{project.title}</h3>}
            >
              <p className="text-zinc-500 font-mono text-sm">{project.period}</p>
              {project.link && (
                <p className="mt-2 text-sm">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    View project
                  </a>
                </p>
              )}
              <p className="text-zinc-300 mt-2 text-sm font-light">{project.description}</p>
              <div className="mt-3 text-xs text-zinc-500 space-y-1 font-mono">
                <p>
                  <span className="text-gold-500">Technology Stack:</span> {project.techStack}
                </p>
                <p>
                  <span className="text-gold-500">My Role:</span> {project.role}
                </p>
              </div>
            </CollapsibleItem>
          </div>
        ))}
      </div>
    </Section>
  );
}
