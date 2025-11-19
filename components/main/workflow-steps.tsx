"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, Cpu, CheckCircle2 } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Import Data",
    description:
      "Upload bulk customer data via CSV or Excel. Our system automatically parses and validates the structure.",
    icon: FileSpreadsheet,
  },
  {
    id: "02",
    title: "AI Processing",
    description:
      "The engine analyzes behavioral patterns, job history, and economic indicators against our predictive models.",
    icon: Cpu,
  },
  {
    id: "03",
    title: "Actionable Results",
    description:
      "Receive a clear YES/NO probability for each client. Focus your team's effort where it counts.",
    icon: CheckCircle2,
  },
];

export const WorkflowSteps = () => {
  return (
    <section id="workflow" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Streamlined Workflow
            </h2>
            <p className="text-muted-foreground text-lg">
              From raw spreadsheet to closed deal in three simple steps.
            </p>
          </div>
          <div className="hidden md:block w-1/3 h-0.5 bg-linear-to-r from-primary/20 to-transparent" />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10" />
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative flex flex-col gap-6 bg-background pt-4 h-full"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-xl shadow-primary/20 z-10">
                  {step.id}
                </div>
                <div className="h-px flex-1 bg-border md:hidden" />
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-colors flex flex-col flex-1 h-full">
                <step.icon className="w-10 h-10 text-primary mb-4 opacity-80" />
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
