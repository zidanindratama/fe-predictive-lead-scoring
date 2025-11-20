"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, BarChart3, Lock } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 bg-background"
    >
      {" "}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {" "}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" />{" "}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-primary/20 rounded-full blur-[120px]"
        />{" "}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 100, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-500/20 rounded-full blur-[120px]"
        />{" "}
      </div>
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="container relative z-10 flex flex-col items-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 border border-primary/20 backdrop-blur-xl text-xs font-medium text-primary mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          AI-Powered Intelligence
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] mb-8 text-foreground">
          <motion.span
            initial={{ opacity: 0, y: 100, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            PREDICT
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 100, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            className="block text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-500 to-blue-600 pb-4"
          >
            SUCCESS
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
        >
          The financial engine that turns raw data into closed deals. Stop
          guessing, start knowing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            size="lg"
            className="h-14 px-8 rounded-full text-lg bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105"
            asChild
          >
            <Link href={"/auth/sign-in"}>
              Start Analysis <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 rounded-full text-lg border-border bg-background/50 backdrop-blur-sm hover:bg-background/80"
            asChild
          >
            <Link href={"/workflow"}>Learn More</Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        style={{ scale: scaleHero, y: yHero }}
        className="w-full max-w-6xl mx-auto mt-24 px-4 perspective-1000"
      >
        <motion.div
          initial={{ rotateX: 45, scale: 0.8, opacity: 0 }}
          animate={{ rotateX: 20, scale: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.5,
          }}
          className="relative rounded-3xl border border-white/10 g-linear-to-b from-white/10 to-white/5 backdrop-blur-2xl shadow-2xl p-1"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-blue-500/20 opacity-50 rounded-3xl" />

          <div className="relative rounded-[22px] bg-background/80 overflow-hidden">
            <div className="h-12 border-b border-border/50 flex items-center px-6 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <div className="ml-4 text-xs text-muted-foreground font-mono">
                dashboard.smartbank.ai
              </div>
            </div>

            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2 space-y-8">
                <div className="space-y-2">
                  <div className="h-2 w-24 bg-primary/20 rounded-full" />
                  <h3 className="text-4xl font-bold">Campaign #2024-Q4</h3>
                  <p className="text-muted-foreground">
                    Predictive analysis active. High confidence targets
                    identified.
                  </p>
                </div>
                <div className="h-48 w-full rounded-xl bg-linear-to-r from-primary/10 via-blue-500/10 to-purple-500/10 border border-border/50 relative overflow-hidden flex items-end pb-0 px-4 gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 1 + i * 0.1 }}
                      className="flex-1 bg-primary/20 rounded-t-md hover:bg-primary/40 transition-colors"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Conversion Probability",
                    val: "94.2%",
                    icon: Zap,
                    col: "text-yellow-500",
                  },
                  {
                    label: "Projected Revenue",
                    val: "$2.4M",
                    icon: BarChart3,
                    col: "text-green-500",
                  },
                  {
                    label: "Risk Assessment",
                    val: "Low",
                    icon: Lock,
                    col: "text-blue-500",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.5 + i * 0.2 }}
                    className="p-4 rounded-xl bg-secondary/30 border border-border/50 flex items-center gap-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg bg-background ${item.col}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="text-xl font-bold">{item.val}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
