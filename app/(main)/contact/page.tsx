import { ContactHero } from "@/components/main/contact/contact-hero";
import { ContactForm } from "@/components/main/contact/contact-form";
import { FaqSection } from "@/components/main/contact/faq-section";
import { CTASection } from "@/components/main/(global)/cta-section";

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
