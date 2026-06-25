import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase, FileCode, Menu, X } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path: string) =>
    `cursor-pointer text-sm font-normal tracking-wide transition-all duration-300 relative py-1 ${
      isActive(path)
        ? "text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        : "text-zinc-400 hover:text-zinc-200"
    }`;

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="navbar-capsule rounded-full px-6 md:px-8 py-4 flex items-center justify-between relative overflow-visible">
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <Link to="/" className="font-serif text-lg md:text-xl font-normal text-zinc-200 tracking-wider hover:text-white transition-colors duration-300" onClick={closeMenu}>
          {profile.name}
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link to="/portfolio" className={navLinkClass("/portfolio")}>
            Portfolio
            {isActive("/portfolio") && (
              <span className="absolute -bottom-1.5 left-1/3 right-1/3 h-px bg-white rounded-full" />
            )}
          </Link>
          <Link to="/blog" className={navLinkClass("/blog")}>
            Blog
            {isActive("/blog") && (
              <span className="absolute -bottom-1.5 left-1/3 right-1/3 h-px bg-white rounded-full" />
            )}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-400 hover:text-white focus:outline-none p-1"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 mx-2">
          <div className="glass-panel border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl relative overflow-hidden bg-black/90">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-600/5 rounded-full blur-2xl" />

            {[
              { to: "/portfolio", icon: Briefcase, label: "Portfolio" },
              { to: "/blog", icon: FileCode, label: "Blog" },
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                className={`flex items-center gap-3 py-3 px-4 rounded-xl text-left font-medium transition-all ${
                  isActive(to)
                    ? "bg-white/[0.08] text-white border-l-4 border-zinc-200"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}

            <Link
              to="/portfolio"
              onClick={closeMenu}
              className="mt-2 w-full py-3.5 rounded-xl btn-champagne font-bold text-xs tracking-widest uppercase text-center active:scale-95"
            >
              View Featured Work
            </Link>

            <div className="mt-4 pt-4 border-t border-white/5 text-center text-xs text-zinc-500 font-mono">
              {profile.email}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
