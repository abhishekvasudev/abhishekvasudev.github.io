import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ title, eyebrow, children, className = "" }: SectionProps) {
  return (
    <section className={`glass-panel rounded-2xl border border-white/5 p-6 md:p-8 shadow-xl ${className}`}>
      <div className="mb-6 pb-5 border-b border-white/5">
        {eyebrow && (
          <span className="font-mono text-xs text-gold-400 uppercase tracking-[0.2em] mb-3 block">
            {eyebrow}
          </span>
        )}
        <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-white text-balance leading-tight">
          {title}
        </h2>
        <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r from-gold-400 to-transparent mt-4" />
      </div>
      {children}
    </section>
  );
}
