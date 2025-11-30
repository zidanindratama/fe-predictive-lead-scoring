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
    question: "How does the AI prediction engine generate scores?",
    answer:
      "Our proprietary engine leverages advanced artificial intelligence to analyze complex behavioral patterns and historical banking data. It processes thousands of signals to calculate a precise conversion probability, allowing you to identify high-value opportunities without revealing the complexity behind the scenes.",
  },
  {
    question: "Does the model consider macroeconomic factors?",
    answer:
      "Yes. SmartBank is context-aware. We integrate real-time global economic indicators and market trends into our analysis. This dynamic approach ensures our predictions remain robust and accurate, adapting seamlessly to changing financial climates.",
  },
  {
    question: "How do I import large datasets of customers?",
    answer:
      "We provide a seamless bulk ingestion system supporting standard formats like CSV and Excel. Our intelligent parser automatically maps and validates your data structure, ensuring your customer profiles are ready for analysis in seconds.",
  },
  {
    question: "What is the 'Campaign Simulation' feature?",
    answer:
      "Before committing your budget, you can run risk-free simulations on your target segments. Our system projects potential outcomes and conversion rates based on your parameters, enabling data-driven decision-making before the campaign goes live.",
  },
  {
    question: "How are user permissions and security managed?",
    answer:
      "Security is our top priority. We implement granular Role-Based Access Control (RBAC) to ensure team members only access data relevant to their role. All sensitive information is protected by enterprise-grade encryption standards.",
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
            Everything you need to know about SmartBank's predictive
            capabilities.
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
                <AccordionTrigger className="text-lg font-medium hover:no-underline py-6 text-left">
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
