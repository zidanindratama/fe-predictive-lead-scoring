"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Data Points Analyzed", value: "50M+" },
  { label: "Prediction Accuracy", value: "98.2%" },
  { label: "Banking Partners", value: "200+" },
  { label: "Revenue Generated", value: "$1B+" },
];

export const StatTicker = () => {
  return (
    <section className="border-y border-border bg-background">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="py-12 md:py-16 px-8 flex flex-col items-center justify-center text-center group hover:bg-secondary/30 transition-colors duration-500"
            >
              <h3 className="text-5xl md:text-6xl font-bold tracking-tighter mb-2 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 group-hover:to-primary transition-all duration-500">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
