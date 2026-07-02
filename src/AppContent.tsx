import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SiteFooter from "./components/layout/SiteFooter";
import ScrollToTop from "./components/layout/ScrollToTop";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import BlogPage from "./pages/BlogPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import FeaturedProjectDetailPage from "./pages/FeaturedProjectDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import content from "./content.index.json";
import type { SiteContent } from "./content.types";

const site = content as unknown as SiteContent;

export default function AppContent() {
  return (
    <div className="min-h-screen bg-[#0b0b0c] text-zinc-100 flex flex-col relative">
      <div className="absolute inset-0 page-grid-texture pointer-events-none" />

      <Header />
      <ScrollToTop />

      <main id="main-content" className="flex-1 w-full relative z-10" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage content={site} />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage content={site} />} />
          <Route path="/blog/:slug" element={<ArticleDetailPage content={site} />} />
          <Route
            path="/featured-projects/:slug"
            element={<FeaturedProjectDetailPage content={site} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <SiteFooter />
    </div>
  );
}
