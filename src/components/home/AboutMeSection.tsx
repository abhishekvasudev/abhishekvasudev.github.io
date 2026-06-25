import { Award, Mail, MapPin } from "lucide-react";
import { about, profile } from "../../data/portfolio";

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function AboutMeSection() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-28" id="about">
      <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-60 h-60 bg-white/[0.02] rounded-full blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-gold-600/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />

            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 bg-zinc-900 shadow-xl max-w-md mx-auto">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover grayscale contrast-110 brightness-95 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-mono text-xs text-gold-400 uppercase tracking-[0.3em] mb-3">
              introducing
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
              About Me
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-gold-400 to-transparent mb-6" />

            <div className="text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed font-light mb-8">
              {about.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-8">
              {[
                { icon: Mail, label: "direct email", value: profile.email, href: `mailto:${profile.email}` },
                { icon: MapPin, label: "location", value: profile.location },
                {
                  icon: LinkedInIcon,
                  label: "linkedin",
                  value: "linkedin.com/in/abhishek-vasudev",
                  href: profile.linkedin,
                },
                { icon: Award, label: "industry status", value: profile.title, accent: true },
              ].map(({ icon: Icon, label, value, href, accent }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gold-950/40 border border-gold-600/20 flex items-center justify-center text-gold-400 shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm font-medium text-white hover:text-gold-300 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className={`text-sm font-medium ${accent ? "text-gold-300" : "text-white"}`}>
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
