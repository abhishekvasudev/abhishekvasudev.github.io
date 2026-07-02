interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export default function SectionHeader({
  eyebrow,
  title,
  align = "left",
  className = "",
  as = "h2",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const Heading = as;

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      <span className="font-mono text-xs text-gold-400 uppercase tracking-[0.3em] mb-3">
        {eyebrow}
      </span>
      <Heading className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-white uppercase">
        {title}
      </Heading>
      <div
        className={`h-[2px] bg-gradient-to-r from-gold-400 to-transparent mt-4 ${
          align === "center" ? "w-24 from-transparent via-gold-400 to-transparent" : "w-16 md:w-20"
        }`}
      />
    </div>
  );
}
