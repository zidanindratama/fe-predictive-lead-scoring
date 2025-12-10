"use client";

import { motion } from "framer-motion";
import {
  Target,
  Workflow,
  Zap,
  Book,
  TrendingDown,
  BrainCircuit,
  BarChart3,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "../doc-ui";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "The Problem",
    subtitle: "Traditional Banking Inefficiencies",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "group-hover:border-red-500/50",
    description:
      "Banks currently rely on cold-calling lists with no intelligence, leading to wasted resources.",
    points: [
      "Low conversion rates (~2%)",
      "High Customer Acquisition Cost (CAC)",
      "Agent burnout from rejection",
      "Generic, impersonal offers",
    ],
  },
  {
    title: "The Solution",
    subtitle: "AI-Driven Intelligence",
    icon: BrainCircuit,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
    description:
      "An advanced machine learning pipeline that processes customer data to predict intent.",
    points: [
      "Analysis of 20+ data points",
      "Macroeconomic context aware",
      "Real-time inference engine",
      "Seamless API integration",
    ],
  },
  {
    title: "The Impact",
    subtitle: "Measurable Business Growth",
    icon: TrendingDown,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50",
    description:
      "Transforming cost centers into profit centers by focusing on high-probability targets.",
    points: [
      "3x Higher conversion rates",
      "40% Reduction in call volume",
      "Personalized customer journey",
      "Data-backed decision making",
    ],
  },
];

export function IntroSection() {
  return (
    <section id="intro" className="scroll-mt-32">
      <SectionHeader
        title="Introduction"
        icon={Book}
        description="SmartBank is an Enterprise Predictive Lead Scoring platform designed to revolutionize how banks identify potential customers using Artificial Intelligence. We bridge the gap between raw data and actionable sales insights."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <Card
              className={cn(
                "h-full transition-all duration-300 hover:shadow-lg bg-background/50 backdrop-blur-sm border-border/50 group",
                feature.border
              )}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={cn("p-3 rounded-xl", feature.bg)}>
                    <feature.icon className={cn("w-6 h-6", feature.color)} />
                  </div>
                </div>
                <div className="pt-4">
                  <CardTitle className="text-xl font-bold mb-1">
                    {feature.title}
                  </CardTitle>
                  <p className="text-sm font-medium text-muted-foreground">
                    {feature.subtitle}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-3">
                  {feature.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className={cn("w-4 h-4 mt-0.5 shrink-0", feature.color)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          Why SmartBank?
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Unlike traditional CRM tools that only store data, SmartBank{" "}
          <strong>understands</strong> it. By combining customer demographics
          with dynamic macroeconomic indicators (such as Euribor rates and
          Consumer Price Index), our models adapt to changing market conditions,
          ensuring your sales team is always one step ahead.
        </p>
      </div>
    </section>
  );
}
