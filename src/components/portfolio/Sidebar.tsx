import {
  achievements,
  education,
  skills,
} from "../../data/portfolio";
import Section from "./Section";

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      <Section title="Achievements">
        <ul className="space-y-3 text-zinc-300 text-sm leading-relaxed font-light">
          {achievements.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-gold-400 mt-1 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Skills">
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-zinc-200">{skill.name}</span>
                <span className="text-xs text-zinc-500 font-mono">{skill.level}</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full transition-all"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div className="space-y-5">
          {education.map((item) => (
            <div key={item.degree}>
              <h3 className="font-semibold text-white text-sm">{item.degree}</h3>
              <p className="text-sm text-zinc-400">{item.institution}</p>
              <p className="text-xs text-zinc-500 font-mono">{item.period}</p>
              <p className="text-xs text-zinc-500 font-mono">{item.aggregate}</p>
            </div>
          ))}
        </div>
      </Section>
    </aside>
  );
}
