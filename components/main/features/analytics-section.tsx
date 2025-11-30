"use client";

import { motion } from "framer-motion";
import { BarChart3, CheckCircle2 } from "lucide-react";
import { AnalyticsMock } from "./ui-mocks";

export const AnalyticsSection = () => {
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
            <div className="absolute -inset-4 bg-linear-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl opacity-50" />
            <div className="relative">
              <AnalyticsMock />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Economic & Performance Analytics
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Understand the "Why" behind the purchase. We overlay your data
              with macroeconomic indicators (Euribor 3m, CPI) to show you market
              trends others miss.
            </p>
            <ul className="space-y-3">
              {[
                "Real-time Conversion Rates",
                "Performance by Job Sector",
                "Macroeconomic Context Integration",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500" />
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
