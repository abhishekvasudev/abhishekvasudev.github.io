import siteConfig from "./site.config.json";

export const SITE_URL = siteConfig.SITE_URL;
export const SITE_NAME = siteConfig.SITE_NAME;
export const AUTHOR_NAME = siteConfig.AUTHOR_NAME;
export const AUTHOR_JOB_TITLE = siteConfig.AUTHOR_JOB_TITLE;
export const AUTHOR_EMPLOYER = siteConfig.AUTHOR_EMPLOYER;
export const SOCIAL_LINKS = siteConfig.SOCIAL_LINKS;
export const DEFAULT_TITLE = siteConfig.DEFAULT_TITLE;
export const DEFAULT_DESCRIPTION = siteConfig.DEFAULT_DESCRIPTION;
export const AUTHOR_EMAIL = siteConfig.AUTHOR_EMAIL;
export const URL_STYLE = siteConfig.URL_STYLE as "flat-html";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.png`;

export const PERSON_SAME_AS = [
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.x,
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function routeToDistPath(route: string): string {
  if (route === "/") return "index.html";
  return `${route.slice(1)}.html`;
}
