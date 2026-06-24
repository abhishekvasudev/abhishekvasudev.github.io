import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-36 pb-20 px-4 text-center overflow-hidden">
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[85vw] h-[55vh] bg-gradient-to-b from-gold-300/12 via-white/[0.02] to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[50vw] h-[30vh] bg-white/[0.04] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#050506] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto z-10 flex flex-col items-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[84px] font-normal tracking-tight leading-[1.08] mb-1 px-4 drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)]">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 via-gold-200 to-zinc-400 select-none">
            ENGINEERING DIGITAL
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-gold-100 via-white to-zinc-300 tracking-wide select-none">
            EXCELLENCE
          </span>
        </h1>

        <div className="w-56 h-px bg-gradient-to-r from-transparent via-gold-300/40 via-white/50 to-transparent my-6 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />

        <p className="max-w-2xl text-base md:text-lg text-zinc-300 font-normal tracking-wide mb-10 select-none leading-relaxed">
          Elite iOS Engineer. Architecting Future-Proof Solutions.
        </p>

        <div className="relative group">
          <div className="absolute -inset-2 rounded-xl bg-gold-200/5 group-hover:bg-gold-200/12 blur-xl transition duration-500 pointer-events-none" />
          <div className="absolute inset-0 rounded-xl bg-white/5 blur-md group-hover:blur-lg transition duration-500 pointer-events-none" />

          <button
            type="button"
            onClick={scrollToAbout}
            className="relative metallic-shine cursor-pointer px-10 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest btn-champagne flex items-center gap-3 active:scale-[0.98]"
          >
            Explore
            <ArrowDown className="h-3.5 w-3.5 text-neutral-800" />
          </button>
        </div>
      </div>
    </section>
  );
}
