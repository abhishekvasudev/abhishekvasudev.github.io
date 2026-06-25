import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SiteFooter from "./components/layout/SiteFooter";
import ScrollToTop from "./components/layout/ScrollToTop";
import content from "./content.generated.json";
import type { SiteContent } from "./content.types";

const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ArticleDetailPage = lazy(() => import("./pages/ArticleDetailPage"));
const FeaturedProjectDetailPage = lazy(() => import("./pages/FeaturedProjectDetailPage"));

const site = content as unknown as SiteContent;

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0b0c] text-zinc-100 flex flex-col relative">
      <div className="absolute inset-0 page-grid-texture pointer-events-none" />

      <Header />
      <ScrollToTop />

      <main className="flex-1 w-full relative z-10">
        <Suspense fallback={null}>
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
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  );
}
