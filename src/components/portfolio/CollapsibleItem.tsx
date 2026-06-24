import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

interface CollapsibleItemProps {
  id: string;
  summary: ReactNode;
  children: ReactNode;
}

export default function CollapsibleItem({ id, summary, children }: CollapsibleItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        className="w-full text-left flex items-start justify-between gap-4 group cursor-pointer"
      >
        <div className="flex-1 min-w-0">{summary}</div>
        <ChevronDown
          className={`w-5 h-5 text-zinc-500 shrink-0 mt-0.5 transition-transform duration-200 group-hover:text-gold-400 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id={`${id}-content`} className="mt-3">
          {children}
        </div>
      )}
    </div>
  );
}
