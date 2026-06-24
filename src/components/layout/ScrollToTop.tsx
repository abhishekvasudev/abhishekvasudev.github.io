import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Reset scroll on route change, unless navigating home with a section target. */
export default function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.key, location.state]);

  return null;
}
