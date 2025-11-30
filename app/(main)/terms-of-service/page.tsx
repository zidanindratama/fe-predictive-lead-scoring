import { TermsHero } from "@/components/main/terms-of-service/terms-hero";
import { TermsContent } from "@/components/main/terms-of-service/terms-content";
import { CTASection } from "@/components/main/(global)/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read SmartBank's Terms of Service. Understand the rules, regulations, and guidelines for using our AI predictive banking platform.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <TermsHero />
      <TermsContent />
      <CTASection />
    </>
  );
}
