"use client";

import { motion } from "framer-motion";
import {
  Database,
  Users,
  Target,
  BrainCircuit,
  LineChart,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Customer Database",
    description:
      "Centralized hub for all customer profiles, interactions, and financial history.",
    icon: Database,
    size: "col-span-1 md:col-span-2",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Campaign Targeting",
    description:
      "Create highly specific campaigns based on age, job, or marital status.",
    icon: Target,
    size: "col-span-1",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "AI Prediction Engine",
    description:
      "Proprietary machine learning model connecting to advanced inference APIs.",
    icon: BrainCircuit,
    size: "col-span-1",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "Deep Analytics",
    description:
      "Visual trends, conversion rates, and performance metrics by job type.",
    icon: LineChart,
    size: "col-span-1 md:col-span-2",
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
];

export const BentoFeatures = () => {
  return (
    <section id="features" className="py-24 bg-secondary/20 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Intelligence built for <br />
            <span className="text-primary">Modern Banking</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to transform raw data into actionable sales
            opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${feature.size}`}
            >
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group overflow-hidden relative">
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
