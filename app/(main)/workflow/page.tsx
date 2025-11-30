import { WorkflowHero } from "@/components/main/workflow/workflow-hero";
import { SystemArchitecture } from "@/components/main/workflow/system-architecture";
import { CoreModules } from "@/components/main/workflow/core-modules";
import { CTASection } from "@/components/main/(global)/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Architecture & Workflow",
  description:
    "Deep dive into SmartBank's tech stack: NestJS Core, MongoDB Cluster, and Python ML Engine. See how data flows securely through our pipeline.",
};

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
