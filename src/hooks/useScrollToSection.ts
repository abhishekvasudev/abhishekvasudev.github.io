import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToSection() {
  const location = useLocation();

  useLayoutEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    const targetId = state?.scrollTo || location.hash.replace("#", "");

    if (!targetId) return;

    document.getElementById(targetId)?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [location.pathname, location.hash, location.state]);
}
