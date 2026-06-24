import { positionsOfResponsibility } from "../../data/portfolio";
import Section from "./Section";

export default function PositionsOfResponsibilitySection() {
  return (
    <Section title="Positions of Responsibility">
      <ul className="space-y-4">
        {positionsOfResponsibility.map((item) => (
          <li key={item.title}>
            <h5 className="font-semibold text-white text-sm">{item.title}</h5>
            <p className="text-sm text-zinc-400 mt-1 font-light">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
