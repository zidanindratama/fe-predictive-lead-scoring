import { AboutHero } from "@/components/main/about-us/about-hero";
import { StatTicker } from "@/components/main/about-us/stat-ticker";
import { OurStory } from "@/components/main/about-us/our-story";
import { TeamShowcase } from "@/components/main/about-us/team-showcase";
import { CTASection } from "@/components/main/(global)/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - The Future of Banking Sales",
  description:
    "Meet the team behind SmartBank. We are engineers and data scientists dedicated to transforming how financial institutions utilize their data.",
};

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
