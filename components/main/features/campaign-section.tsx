"use client";

import { motion } from "framer-motion";
import { Target, CheckCircle2 } from "lucide-react";
import { CampaignMock } from "./ui-mocks";

export const CampaignSection = () => {
  return (
    <section className="py-24 bg-secondary/20 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Precision Campaign Targeting
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Don't waste budget on broad marketing. Create laser-focused
              campaigns based on specific demographics and financial behaviors
              using our advanced filtering engine.
            </p>
            <ul className="space-y-3">
              {[
                "Complex JSON-Logic Filtering",
                "Pre-flight Simulations",
                "Estimated Reach Calculation",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="absolute -inset-4 bg-linear-to-l from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-50" />
            <div className="relative">
              <CampaignMock />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
