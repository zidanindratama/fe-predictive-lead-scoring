"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const AboutHero = () => {
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
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-background pt-32 pb-12"
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div style={{ y, opacity }} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary tracking-wide"
          >
            Our Philosophy
          </motion.div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
            <span className="block">WE DECODE</span>
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-primary via-blue-500 to-purple-600">
              THE FUTURE
            </span>
            <span className="block">OF BANKING</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-muted-foreground leading-relaxed">
            SmartBank isn't just software. It's the bridge between raw data and
            revenue, built by engineers who speak the language of finance.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent z-20" />
    </section>
  );
};
