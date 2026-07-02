import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import SiteFooter from "./components/layout/SiteFooter";
import ScrollToTop from "./components/layout/ScrollToTop";
import HomePage from "./pages/HomePage";
import content from "./content.index.json";
import type { SiteContent } from "./content.types";

const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ArticleDetailPage = lazy(() => import("./pages/ArticleDetailPage"));
const FeaturedProjectDetailPage = lazy(() => import("./pages/FeaturedProjectDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const site = content as unknown as SiteContent;

function RouteFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />;
}

function ClientRoutes() {
  return (
    <div className="min-h-screen bg-[#0b0b0c] text-zinc-100 flex flex-col relative">
      <div className="absolute inset-0 page-grid-texture pointer-events-none" />
      <Header />
      <ScrollToTop />
      <main id="main-content" className="flex-1 w-full relative z-10" tabIndex={-1}>
        <Suspense fallback={<RouteFallback />}>
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

export default function App() {
  return <ClientRoutes />;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </HelmetProvider>
  );
}
