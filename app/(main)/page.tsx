import { HeroSection } from "@/components/main/hero-section";
import { BentoFeatures } from "@/components/main/bento-features";
import { WorkflowSteps } from "@/components/main/workflow-steps";
import { CTASection } from "@/components/main/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BentoFeatures />
      <WorkflowSteps />
      <CTASection />
    </>
  );
}
