import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/** Reset scroll on forward navigations; focus main heading on route change. */
export default function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) return;

    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    const main = document.getElementById("main-content");
    const heading = main?.querySelector("h1");
    if (heading instanceof HTMLElement) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }, [location.pathname, location.key, location.state, navigationType]);

  return null;
}
