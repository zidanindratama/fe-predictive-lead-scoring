"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const FeaturesHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="container px-4 mx-auto relative z-10 text-center">
        <motion.div style={{ y, opacity }}>
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 border-primary/30 bg-primary/5 text-primary"
          >
            Powerful Capabilities
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            More than just <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-600">
              Data Entry.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            SmartBank solves the "Analysis Paralysis" in modern banking. We
            transform millions of rows of customer data into a single,
            actionable decision.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
