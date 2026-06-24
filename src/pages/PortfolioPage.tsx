import ProfileHeader from "../components/portfolio/ProfileHeader";
import ExperienceSection from "../components/portfolio/ExperienceSection";
import PositionsOfResponsibilitySection from "../components/portfolio/PositionsOfResponsibilitySection";
import ProjectsSection from "../components/portfolio/ProjectsSection";
import Sidebar from "../components/portfolio/Sidebar";

export default function PortfolioPage() {
  return (
    <>
      <ProfileHeader />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ExperienceSection />
            <ProjectsSection />
            <PositionsOfResponsibilitySection />
          </div>
          <Sidebar />
        </div>
      </main>
    </>
  );
}
