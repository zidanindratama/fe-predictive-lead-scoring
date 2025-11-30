import { PrivacyHero } from "@/components/main/privacy-policy/privacy-hero";
import { PrivacyContent } from "@/components/main/privacy-policy/privacy-content";
import { CTASection } from "@/components/main/(global)/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "SmartBank Privacy Policy. Learn how we collect, use, and protect your personal and financial data with enterprise-grade security.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyHero />
      <PrivacyContent />
      <CTASection />
    </>
  );
}
