"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const OurStory = () => {
  return (
    <section className="py-24 bg-secondary/5">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-linear-to-br from-primary/20 to-blue-600/20 relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 p-6 bg-background/10 backdrop-blur-xl border border-primary/10 dark:border-white/10 rounded-2xl">
                <div className="text-4xl font-bold text-primary dark:text-white mb-2">
                  2024
                </div>
                <div className="text-primary dark:text-white/80 text-sm">
                  SmartBank founded with a mission to democratize AI for
                  financial institutions.
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              Beyond the <br />
              <span className="text-primary">Spreadsheet</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <p>
                Traditional banking sales rely on intuition and outdated
                spreadsheets. We knew there was a better way. By harnessing the
                power of Machine Learning, we built a system that doesn't just
                store data—it understands it.
              </p>
              <p>
                Our algorithms sift through millions of data points to find the
                subtle patterns that indicate a customer's readiness to buy. The
                result? Less cold calling, more closing.
              </p>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 pt-4"
            >
              {[
                "Data-First Architecture",
                "Bank-Grade Security",
                "Seamless Integration",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-lg font-medium"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};
