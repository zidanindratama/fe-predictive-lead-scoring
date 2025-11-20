import { AboutHero } from "@/components/main/about-us/about-hero";
import { StatTicker } from "@/components/main/about-us/stat-ticker";
import { OurStory } from "@/components/main/about-us/our-story";
import { TeamShowcase } from "@/components/main/about-us/team-showcase";
import { CTASection } from "@/components/main/(global)/cta-section";

export default function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <StatTicker />
      <OurStory />
      <TeamShowcase />
      <CTASection />
    </>
  );
}
