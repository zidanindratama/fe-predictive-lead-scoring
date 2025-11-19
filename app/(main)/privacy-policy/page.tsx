import { PrivacyHero } from "@/components/main/privacy-policy/privacy-hero";
import { PrivacyContent } from "@/components/main/privacy-policy/privacy-content";
import { CTASection } from "@/components/main/cta-section";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyHero />
      <PrivacyContent />
      <CTASection />
    </>
  );
}
