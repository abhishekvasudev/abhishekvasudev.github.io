import { profile } from "../../data/portfolio";
import SocialIcons from "../portfolio/SocialIcons";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-400 order-2 sm:order-1">
          © {new Date().getFullYear()} {profile.name}. All Rights Reserved.
        </p>
        <SocialIcons links={profile.social} variant="footer" />
      </div>
    </footer>
  );
}
