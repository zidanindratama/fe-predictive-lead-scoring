"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2.5rem] overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-[#0a0a0a] z-0" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full z-2 pointer-events-none" />

          <div className="relative z-10 px-6 py-24 md:py-32 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-white/90 tracking-wide">
                AI-Powered Growth Engine
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mb-8 leading-[1.1]">
              Ready to predict the <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/50">
                future of your sales?
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed">
              Join forward-thinking financial institutions using SmartBank to
              transform raw data into closed deals with precision.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <Link href="/auth/sign-up" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-16 px-8 rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300 text-lg font-semibold group shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-16 px-8 rounded-full border-white/20 text-white hover:text-white hover:bg-white/10 hover:border-white text-lg bg-transparent backdrop-blur-sm transition-all"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
