import { about } from "../../data/portfolio";
import Section from "./Section";

export default function AboutSection() {
  return (
    <Section title="About Me">
      <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
        {about.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}

        <div>
          <p className="mb-2">I have a passion for blending the best mobile technical practices like:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            {about.mobilePractices.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2">Other skills that I am good in are:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            {about.otherSkills.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2">About my leadership / team-building skills:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            {about.leadership.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p>
          The quote I relate to:
          <br />
          <em className="text-gray-600">
            &ldquo;{about.quote.text}&rdquo; - {about.quote.author}
          </em>
          <br />
          {about.quote.closing}
        </p>
      </div>
    </Section>
  );
}
