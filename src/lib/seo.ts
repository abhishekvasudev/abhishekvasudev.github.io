export const SITE_URL = "https://www.abhishekvasu.dev";

export const DEFAULT_TITLE = "Abhishek Vasudev | Senior iOS & SwiftUI Developer";

export const DEFAULT_DESCRIPTION =
  "Abhishek Vasudev is a Senior iOS Engineer and SwiftUI Developer based in London. Expert in Swift, iOS development, and building scalable mobile applications at Expedia Group.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/profile2.jpg`;

export const SITE_NAME = "Abhishek Vasudev";

export const PERSON_SAME_AS = [
  "https://www.linkedin.com/in/abhishek-vasudev",
  "https://github.com/abhishekvasudev/",
  "https://www.codechef.com/users/abhishekv",
] as const;

export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abhishek Vasudev",
  jobTitle: "Senior iOS Engineer",
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  email: "abhishekvasudev7@gmail.com",
  worksFor: {
    "@type": "Organization",
    name: "Expedia Group",
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

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
