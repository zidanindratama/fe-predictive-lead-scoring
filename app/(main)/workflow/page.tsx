import { WorkflowHero } from "@/components/main/workflow/workflow-hero";
import { SystemArchitecture } from "@/components/main/workflow/system-architecture";
import { CoreModules } from "@/components/main/workflow/core-modules";
import { CTASection } from "@/components/main/(global)/cta-section";

export default function WorkflowPage() {
  return (
    <>
      <WorkflowHero />
      <SystemArchitecture />
      <CoreModules />
      <CTASection />
    </>
  );
}
