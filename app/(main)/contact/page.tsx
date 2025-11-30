import { ContactHero } from "@/components/main/contact/contact-hero";
import { ContactForm } from "@/components/main/contact/contact-form";
import { FaqSection } from "@/components/main/contact/faq-section";
import { CTASection } from "@/components/main/(global)/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sales & Support",
  description:
    "Ready to deploy predictive AI? Get in touch with our sales team or find answers to common questions about security, integration, and pricing.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <FaqSection />
      <CTASection />
    </>
  );
}
