import { FeaturesHero } from "@/components/main/features/features-hero";
import { LeadScoringSection } from "@/components/main/features/lead-scoring-section";
import { CampaignSection } from "@/components/main/features/campaign-section";
import { AnalyticsSection } from "@/components/main/features/analytics-section";
import { CTASection } from "@/components/main/(global)/cta-section";
import { FeatureGrid } from "@/components/main/features/feature-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Features - Predictive Lead Scoring & Analytics",
  description:
    "Explore SmartBank's powerful suite of tools: AI-driven Lead Scoring, Precision Campaign Targeting, and Real-time Financial Analytics designed to maximize conversion rates.",
};

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <LeadScoringSection />
      <CampaignSection />
      <AnalyticsSection />
      <FeatureGrid />
      <CTASection />
    </>
  );
}
