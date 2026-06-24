import { workExperience } from "../../data/portfolio";
import { getCompanyTenure } from "../../lib/experienceUtils";
import CollapsibleItem from "./CollapsibleItem";
import Section from "./Section";

function RoleDetails({ role }: { role: (typeof workExperience)[number]["roles"][number] }) {
  return (
    <div className="pt-4 first:pt-0">
      <h4 className="text-base font-semibold text-white">
        {role.title}{" "}
        <span className="text-zinc-500 font-normal font-mono text-sm">| {role.period}</span>
      </h4>
      {role.location && <p className="text-zinc-500 text-sm mt-1">{role.location}</p>}

      {role.link && (
        <p className="text-zinc-300 text-sm mt-2">
          {role.description && <>{role.description} </>}
          {!role.description && <>Worked on </>}
          <a
            href={role.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 hover:text-gold-300 transition-colors"
          >
            {role.link.label}
          </a>
          .
        </p>
      )}

      <ul className="list-disc list-inside space-y-1 mt-3 text-zinc-300 text-sm ml-2 font-light">
        {role.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="mt-3 text-xs text-zinc-500 space-y-1 font-mono">
        {role.techStack && (
          <p>
            <span className="text-gold-500">Technology Stack:</span> {role.techStack}
          </p>
        )}
        {role.platform && (
          <p>
            <span className="text-gold-500">Platform/IDE:</span> {role.platform}
          </p>
        )}
        {role.others && (
          <p>
            <span className="text-gold-500">Others:</span> {role.others}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <Section title="Work Experience" eyebrow="professional journey">
      <div className="space-y-6">
        {workExperience.map((group, index) => (
          <div key={group.company}>
            {index > 0 && <hr className="border-white/5 mb-6" />}
            <CollapsibleItem
              id={`experience-${index}`}
              summary={
                <>
                  <h3 className="text-lg font-semibold text-white">{group.company}</h3>
                  <p className="text-zinc-500 mt-1 text-sm font-mono">{getCompanyTenure(group)}</p>
                </>
              }
            >
              <div className="divide-y divide-white/5">
                {group.roles.map((role) => (
                  <RoleDetails key={`${role.title}-${role.period}`} role={role} />
                ))}
              </div>
            </CollapsibleItem>
          </div>
        ))}
      </div>
    </Section>
  );
}
