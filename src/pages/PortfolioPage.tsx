import ProfileHeader from "../components/portfolio/ProfileHeader";
import ExperienceSection from "../components/portfolio/ExperienceSection";
import PositionsOfResponsibilitySection from "../components/portfolio/PositionsOfResponsibilitySection";
import ProjectsSection from "../components/portfolio/ProjectsSection";
import Sidebar from "../components/portfolio/Sidebar";
import SEO from "../components/SEO";

export default function PortfolioPage() {
  return (
    <>
      <SEO
        title="Portfolio | Abhishek Vasudev — Senior iOS Engineer"
        description="Professional portfolio of Abhishek Vasudev — Senior iOS Engineer specializing in Swift, SwiftUI, and scalable mobile architecture. Work experience at Expedia Group, Mutual Mobile, and Infosys."
        url="/portfolio"
        type="profile"
      />
      <ProfileHeader />
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ExperienceSection />
            <ProjectsSection />
            <PositionsOfResponsibilitySection />
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
