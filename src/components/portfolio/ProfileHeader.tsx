import { profile } from "../../data/portfolio";
import SocialIcons from "./SocialIcons";

export default function ProfileHeader() {
  return (
    <section className="pt-28 sm:pt-36 pb-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-8 relative">
          <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6 md:w-auto">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl object-cover border border-white/10 grayscale contrast-110 shadow-xl"
            />
            <div className="min-w-0 text-center sm:text-left">
              <span className="font-mono text-xs text-gold-400 uppercase tracking-[0.3em] mb-2 block">
                portfolio
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-white text-balance">
                {profile.name}
              </h1>
              <p className="text-base sm:text-lg text-gold-300 font-light mt-1">{profile.title}</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4 border-t border-white/5 pt-5 md:w-auto md:items-end md:border-0 md:pt-0">
            <a
              href={`mailto:${profile.email}`}
              className="break-words text-center text-xs sm:text-sm text-zinc-400 font-mono hover:text-gold-300 transition-colors md:text-right"
            >
              {profile.email}
            </a>
            <SocialIcons links={profile.social} variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
