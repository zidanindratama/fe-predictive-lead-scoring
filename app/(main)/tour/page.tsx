import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/main/(global)/cta-section";
import { TourInteractive } from "@/components/main/tour/tour-interactive";
import { Transformation } from "@/components/main/tour/transformation";
import { ModelPerformanceSection } from "@/components/main/tour/model-performance";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Product Tour",
  description:
    "Experience SmartBank in action. Walk through our AI prediction workflow, from data import to actionable insights, without signing up.",
};

export default function TourPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="pt-32 pb-12 text-center px-4">
        <Badge
          variant="outline"
          className="mb-6 px-4 py-1.5 border-primary/30 bg-primary/5 text-primary"
        >
          Product Tour
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          See SmartBank in <span className="text-primary">Action</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Walk through the platform experience step-by-step. No sign-up
          required.
        </p>
      </section>
      <TourInteractive />
      <ModelPerformanceSection />
      <Transformation />
      <CTASection />
    </div>
  );
}
