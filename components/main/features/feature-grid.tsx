"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Users } from "lucide-react";

export const FeatureGrid = () => {
  return (
    <section className="py-24 bg-secondary/5 border-t border-border">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Enterprise-Ready Features</h2>
          <p className="text-muted-foreground">
            Built to scale with your institution from day one.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: "RBAC Security",
              desc: "Granular roles for Admin, Staff, and Users.",
            },
            {
              icon: Zap,
              title: "Low Latency",
              desc: "Optimized NestJS backend for <50ms response times.",
            },
            {
              icon: Globe,
              title: "Data Import",
              desc: "Seamless bulk CSV/Excel import processing.",
            },
            {
              icon: Users,
              title: "Team Management",
              desc: "Manage seats and permissions easily.",
            },
          ].map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <feat.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
