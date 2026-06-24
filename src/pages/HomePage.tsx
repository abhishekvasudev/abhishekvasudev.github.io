import HeroSection from "../components/home/HeroSection";
import AboutMeSection from "../components/home/AboutMeSection";
import InsightsSection from "../components/home/InsightsSection";
import FeaturedProjectsSection from "../components/home/FeaturedProjectsSection";
import ReturnToTop from "../components/home/ReturnToTop";
import { useScrollToSection } from "../hooks/useScrollToSection";
import type { SiteContent } from "../content.types";

interface HomePageProps {
  content: SiteContent;
}

export default function HomePage({ content }: HomePageProps) {
  useScrollToSection();
  return (
    <>
      <HeroSection />
      <AboutMeSection />
      <InsightsSection articles={content.articles} />
      <FeaturedProjectsSection projects={content.featured_projects} />
      <ReturnToTop />
    </>
  );
}
