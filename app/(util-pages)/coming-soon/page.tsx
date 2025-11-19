"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="absolute inset-0 opacity-[0.05] z-0" />

      <div className="relative z-10 container px-4 mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
        >
          <Sparkles className="w-3 h-3" />
          <span>System Initializing</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50"
        >
          Something Bold <br /> is{" "}
          <span className="italic font-serif text-primary">Arriving</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mb-12"
        >
          We are architecting the next generation of predictive financial
          intelligence. Be the first to access the future.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex w-full max-w-sm items-center space-x-2 bg-secondary/30 p-2 rounded-full border border-border/50 backdrop-blur-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="Enter your work email"
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 pl-4"
          />
          <Button type="submit" size="sm" className="rounded-full h-10 px-6">
            Notify Me
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
