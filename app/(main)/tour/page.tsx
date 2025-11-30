import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/main/(global)/cta-section";
import { TourInteractive } from "@/components/main/tour/tour-interactive";
import { Transformation } from "@/components/main/tour/transformation";

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
      <Transformation />
      <CTASection />
    </div>
  );
}
