import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
import AppContent from "./AppContent";

export interface RenderResult {
  appHtml: string;
  headTags: string;
}

export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]}>
        <AppContent />
      </MemoryRouter>
    </HelmetProvider>,
  );

  const helmet = helmetContext.helmet;
  const headTags = helmet
    ? [
        helmet.title.toString(),
        helmet.priority.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return { appHtml, headTags };
}
