"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Zap, CheckCircle2, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadStep, ProcessingStep, ResultStep } from "./tour-visuals";

const steps = [
  {
    id: "upload",
    title: "1. Upload Data",
    description:
      "Import your customer list via CSV. Our system automatically maps columns like Job, Age, and Marital Status.",
    icon: Upload,
    component: UploadStep,
  },
  {
    id: "process",
    title: "2. AI Analysis",
    description:
      "SmartBank enriches data with real-time economic indicators (CPI, Euribor) and runs it through our engine.",
    icon: Zap,
    component: ProcessingStep,
  },
  {
    id: "result",
    title: "3. Get Predictions",
    description:
      "Receive actionable insights. See who is likely to convert with a clear probability score.",
    icon: CheckCircle2,
    component: ResultStep,
  },
];

export const TourInteractive = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="pb-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 border ${
                  activeStep === index
                    ? "bg-secondary border-primary/50 shadow-md ring-1 ring-primary/20"
                    : "bg-background border-transparent hover:bg-secondary/50 hover:border-border/50"
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      activeStep === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <h3
                    className={`font-bold text-lg ${
                      activeStep === index
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-14">
                  {step.description}
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="relative h-[500px] bg-background border border-border rounded-3xl shadow-2xl p-2 md:p-4 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-12 bg-secondary/30 border-b border-border flex items-center px-4 gap-2 z-20 backdrop-blur-md">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="ml-4 px-3 py-1 bg-background rounded-md text-xs text-muted-foreground flex items-center gap-2 flex-1 max-w-xs">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  dashboard.smartbank.ai
                </div>
              </div>

              <div className="h-full pt-12 p-4 md:p-8 bg-slate-50 dark:bg-[#0c0c0c]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full max-w-2xl mx-auto"
                  >
                    {steps[activeStep].component()}
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="absolute top-1/2 left-1/2 z-30 pointer-events-none"
              >
                <MousePointer2 className="w-6 h-6 text-foreground fill-current opacity-50" />
              </motion.div>
            </div>

            <div className="flex justify-between mt-6 lg:hidden">
              <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => prev - 1)}
                variant="outline"
              >
                Previous
              </Button>
              <Button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((prev) => prev + 1)}
              >
                Next Step
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
