"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  BrainCircuit,
  ArrowRightLeft,
  FileJson,
  ScanSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";

const dataSamples = {
  input: `{
  "customer_profile": {
    "age": 45,
    "job": "entrepreneur",
    "marital": "married",
    "education": "university.degree",
    "housing": "yes",
    "loan": "no"
  },
  "campaign_context": {
    "contact_type": "cellular",
    "month": "may",
    "day_of_week": "mon",
    "duration": 285,
    "campaign_count": 2
  },
  "macroeconomics": {
    "emp_var_rate": -1.8,
    "cons_price_idx": 92.893,
    "cons_conf_idx": -46.2,
    "euribor3m": 1.299,
    "nr_employed": 5099.1
  }
}`,
  output: `{
  "prediction": {
    "id": "pred_8x9s0d8f",
    "class": "YES",
    "confidence_score": 0.942,
    "segment": "High Value Target"
  },
  "analysis": {
    "primary_driver": "macroeconomics",
    "risk_factor": "low",
    "recommended_action": "immediate_follow_up"
  },
  "timestamp": "2025-11-20T10:30:00Z",
  "processing_time_ms": 45
}`,
};

export const DataIntelligence = () => {
  const [activeTab, setActiveTab] = useState<"input" | "output">("input");

  return (
    <section className="py-24 bg-[#09090b] overflow-hidden border-t border-white/10">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
              <BrainCircuit className="w-4 h-4" />
              <span>Deep Learning Context</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Complex data in, <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">
                clarity out.
              </span>
            </h2>

            <p className="text-lg text-zinc-400 leading-relaxed">
              SmartBank doesn't just look at who the customer is. We
              contextualize every profile with real-time macroeconomic
              indicators (Euribor, CPI) to generate highly accurate predictions
              that adapt to market conditions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                {
                  title: "360° Profiling",
                  desc: "Demographics & Behavior",
                  icon: ScanSearch,
                },
                {
                  title: "Economic Aware",
                  desc: "Market Index Integration",
                  icon: Database,
                },
                {
                  title: "Low Latency",
                  desc: "<50ms Processing Time",
                  icon: ArrowRightLeft,
                },
                {
                  title: "Transparent",
                  desc: "Explainable JSON Output",
                  icon: FileJson,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <item.icon className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-purple-500 to-blue-500 rounded-2xl blur-sm opacity-30" />

            <div className="relative bg-[#1c1c1e] rounded-2xl border border-white/10 shadow-2xl overflow-hidden min-h-[450px] flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#1c1c1e]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="ml-2 text-xs text-zinc-500 font-mono">
                    model.json
                  </span>
                </div>
                <div className="flex bg-black/50 p-1 rounded-lg">
                  {(["input", "output"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "px-4 py-1 text-xs font-medium rounded-md transition-all uppercase tracking-wider",
                        activeTab === tab
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 relative flex-1 overflow-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-sm leading-relaxed"
                  >
                    {activeTab === "input" ? (
                      <code className="text-blue-300">
                        {`{
  `}
                        <span className="text-purple-400">
                          "customer_profile"
                        </span>
                        {`: {
    `}
                        <span className="text-orange-300">"age"</span>
                        {`: 45,
    `}
                        <span className="text-orange-300">"job"</span>
                        {`: "entrepreneur",
    `}
                        <span className="text-orange-300">"marital"</span>
                        {`: "married",
    `}
                        <span className="text-orange-300">"education"</span>
                        {`: "university.degree",
    `}
                        <span className="text-orange-300">"housing"</span>
                        {`: "yes",
    `}
                        <span className="text-orange-300">"loan"</span>
                        {`: "no"
  },
  `}
                        <span className="text-purple-400">
                          "macroeconomics"
                        </span>
                        {`: {
    `}
                        <span className="text-orange-300">"emp_var_rate"</span>
                        {`: -1.8,
    `}
                        <span className="text-orange-300">
                          "cons_price_idx"
                        </span>
                        {`: 92.893,
    `}
                        <span className="text-orange-300">"euribor3m"</span>
                        {`: 1.299
  }
}`}
                      </code>
                    ) : (
                      <code className="text-green-300">
                        {`{
  `}
                        <span className="text-purple-400">"prediction"</span>
                        {`: {
    `}
                        <span className="text-orange-300">"class"</span>
                        {`: "YES",
    `}
                        <span className="text-orange-300">
                          "confidence_score"
                        </span>
                        {`: 0.942,
    `}
                        <span className="text-orange-300">"segment"</span>
                        {`: "High Value Target"
  },
  `}
                        <span className="text-purple-400">"analysis"</span>
                        {`: {
    `}
                        <span className="text-orange-300">
                          "primary_driver"
                        </span>
                        {`: "macroeconomics",
    `}
                        <span className="text-orange-300">"risk_factor"</span>
                        {`: "low"
  },
  `}
                        <span className="text-purple-400">
                          "processing_time"
                        </span>
                        {`: "45ms"
}`}
                      </code>
                    )}
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
