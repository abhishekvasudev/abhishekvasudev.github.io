interface ReturnToTopProps {
  compact?: boolean;
}

export default function ReturnToTop({ compact = false }: ReturnToTopProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`flex justify-center ${compact ? "pt-8 pb-4" : "py-10"}`}>
      <button
        type="button"
        onClick={scrollToTop}
        className="cursor-pointer flex flex-col items-center gap-2 group text-zinc-500 hover:text-white transition-colors"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">return to top</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-700 to-transparent group-hover:from-white group-hover:h-14 transition-all duration-500" />
      </button>
    </div>
  );
}
