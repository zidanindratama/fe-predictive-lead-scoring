"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does the AI prediction model work?",
    answer:
      "Our model analyzes historical banking data, customer demographics, and behavioral patterns using advanced machine learning algorithms. It assigns a probability score to each lead, indicating their likelihood to convert for specific banking products.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use bank-grade encryption (AES-256) for all data at rest and in transit. We are SOC2 Type II compliant and never share your proprietary customer data with third parties.",
  },
  {
    question: "Can I integrate SmartBank with my existing CRM?",
    answer:
      "Yes, SmartBank offers seamless API integrations with major CRMs like Salesforce, HubSpot, and Microsoft Dynamics. We also support custom webhooks for proprietary internal systems.",
  },
  {
    question: "What is the pricing structure?",
    answer:
      "We offer tiered pricing based on the volume of customer profiles processed and the number of active seats. Contact our sales team for a custom quote tailored to your institution's size.",
  },
  {
    question: "Do you offer on-premise deployment?",
    answer:
      "Yes, for enterprise clients with strict data residency requirements, we offer on-premise deployment options using Docker containers or Kubernetes clusters within your private cloud.",
  },
];

export const FaqSection = () => {
  return (
    <section className="py-24 bg-secondary/5 border-t border-border">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Everything you need to know about SmartBank's platform.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border/50 bg-background/50 px-6 rounded-2xl data-[state=open]:border-primary/30 data-[state=open]:bg-secondary/20 transition-all duration-300"
              >
                <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
