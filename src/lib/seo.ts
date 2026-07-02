import {
  AUTHOR_EMAIL,
  AUTHOR_EMPLOYER,
  AUTHOR_JOB_TITLE,
  AUTHOR_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  PERSON_SAME_AS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "../config/site";

export {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  PERSON_SAME_AS,
  absoluteUrl,
};

export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  jobTitle: AUTHOR_JOB_TITLE,
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  email: AUTHOR_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
  },
  worksFor: {
    "@type": "Organization",
    name: AUTHOR_EMPLOYER,
  },
  sameAs: [...PERSON_SAME_AS],
  knowsAbout: [
    {
      "@type": "Thing",
      name: "iOS Development",
      sameAs: "https://developer.apple.com/ios/",
    },
    {
      "@type": "Thing",
      name: "Swift",
      sameAs: "https://en.wikipedia.org/wiki/Swift_(programming_language)",
    },
    {
      "@type": "Thing",
      name: "SwiftUI",
      sameAs: "https://developer.apple.com/documentation/swiftui/",
    },
  ],
} as const;

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
} as const;

export function homeJsonLd() {
  return [PERSON_SCHEMA, WEBSITE_SCHEMA];
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: PERSON_SCHEMA,
    url: absoluteUrl("/portfolio"),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  slug: string;
  image?: string;
}) {
  const articleUrl = absoluteUrl(`/blog/${article.slug}`);
  const image = article.image ? absoluteUrl(article.image) : DEFAULT_OG_IMAGE;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
      author: {
        "@type": "Person",
        name: article.author,
        url: SITE_URL,
      },
      image,
      url: articleUrl,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: absoluteUrl("/blog"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: articleUrl,
        },
      ],
    },
  ];
}
