export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  body: string;
  images: string[];
  slug: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
  sortOrder: number;
  body: string;
  slug: string;
}

export interface ContentFacets {
  categories: string[];
  tags: string[];
}

export interface ContentStats {
  total_articles: number;
  total_featured_projects: number;
  by_category: Record<string, number>;
}

export interface SiteContent {
  generated_at: string;
  articles: Article[];
  featured_projects: FeaturedProject[];
  facets: ContentFacets;
  stats: ContentStats;
}
