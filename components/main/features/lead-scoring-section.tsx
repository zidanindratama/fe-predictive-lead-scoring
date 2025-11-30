"use client";

import { motion } from "framer-motion";
import { BrainCircuit, CheckCircle2 } from "lucide-react";
import { LeadScoringMock } from "./ui-mocks";

export const LeadScoringSection = () => {
  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-50" />
            <div className="relative">
              <LeadScoringMock />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Automated Lead Scoring
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Stop guessing which customers to call. Our algorithm analyzes 20+
              data points (job, education, loan history, etc.) to assign a
              precise probability score to every profile.
            </p>
            <ul className="space-y-3">
              {[
                "Instant YES/NO Classification",
                "Confidence Probability Score (0-100%)",
                "Historical Pattern Matching",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
