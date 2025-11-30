import { HeroSection } from "@/components/main/hero-section";
import { BentoFeatures } from "@/components/main/bento-features";
import { WorkflowSteps } from "@/components/main/workflow-steps";
import { CTASection } from "@/components/main/(global)/cta-section";
import { ROICalculator } from "@/components/main/roi-calculator";
import { DataIntelligence } from "@/components/main/data-intelligence";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BentoFeatures />
      <ROICalculator />
      <DataIntelligence />
      <WorkflowSteps />
      <CTASection />
    </>
  );
}
