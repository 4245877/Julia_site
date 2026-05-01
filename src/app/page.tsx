import { HeroSection } from "@/widgets/hero/HeroSection";
import { ArchitectureSection } from "@/widgets/architecture/ArchitectureSection";
import { BrainModelSection } from "@/widgets/architecture/BrainModelSection";
import { RoadmapSection } from "@/widgets/roadmap/RoadmapSection";
import { FeaturesSection } from "@/widgets/features/FeaturesSection";
import { TechStackSection } from "@/widgets/tech-stack/TechStackSection";
import { ProfileCustomizer } from "@/features/profile-customizer/ui/ProfileCustomizer";
import { LauncherSection } from "@/widgets/launcher/LauncherSection";
import { DeveloperJourneySection } from "@/widgets/developer/DeveloperJourneySection";
import { Footer } from "@/widgets/footer/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <HeroSection />
      <ArchitectureSection />
      <BrainModelSection />
      <RoadmapSection />
      <FeaturesSection />
      <TechStackSection />
      <ProfileCustomizer />
      <LauncherSection />
      <DeveloperJourneySection />
      <Footer />
    </main>
  );
}