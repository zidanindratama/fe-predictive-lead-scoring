import { TermsHero } from "@/components/main/terms-of-service/terms-hero";
import { TermsContent } from "@/components/main/terms-of-service/terms-content";
import { CTASection } from "@/components/main/cta-section";
export default function TermsOfServicePage() {
  return (
    <>
      <TermsHero />
      <TermsContent />
      <CTASection />
    </>
  );
}
