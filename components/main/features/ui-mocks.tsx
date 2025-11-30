"use client";

import { motion } from "framer-motion";
import { Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const LeadScoringMock = () => (
  <div className="relative w-full h-full min-h-[300px] bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-6 flex flex-col gap-4">
    <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
          <Users className="w-5 h-5 text-slate-500" />
        </div>
        <div>
          <div className="font-bold text-sm">Sarah Jenkins</div>
          <div className="text-xs text-muted-foreground">ID: #88321</div>
        </div>
      </div>
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
        High Probability
      </Badge>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Prediction Score</span>
        <span className="font-bold text-blue-600">94.2%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "94.2%" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-full bg-blue-600 rounded-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-100 dark:border-zinc-800">
          <div className="text-xs text-muted-foreground">Job Type</div>
          <div className="font-medium text-sm">Management</div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-100 dark:border-zinc-800">
          <div className="text-xs text-muted-foreground">Education</div>
          <div className="font-medium text-sm">University</div>
        </div>
      </div>
    </div>
  </div>
);

export const CampaignMock = () => (
  <div className="relative w-full h-full min-h-[300px] bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-6">
    <div className="flex items-center gap-2 mb-6">
      <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-purple-600">
        <Filter className="w-4 h-4" />
      </div>
      <span className="font-bold">Campaign Rules</span>
    </div>
    <div className="space-y-2">
      {[
        { label: "Age Range", val: "25 - 45 years" },
        { label: "Job Category", val: "Tech, Admin, Management" },
        { label: "Marital Status", val: "Single, Married" },
        { label: "Housing Loan", val: "Yes" },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors"
        >
          <span className="text-sm text-muted-foreground">{item.label}</span>
          <span className="text-sm font-medium">{item.val}</span>
        </motion.div>
      ))}
    </div>
    <div className="mt-6 flex justify-end">
      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
        Run Simulation
      </Button>
    </div>
  </div>
);

export const AnalyticsMock = () => (
  <div className="relative w-full h-full min-h-[300px] bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col justify-end items-end p-6 gap-2">
    <div className="absolute top-6 left-6">
      <div className="font-bold text-lg">Conversion Trend</div>
      <div className="text-xs text-muted-foreground">Last 30 Days</div>
    </div>
    <div className="w-full h-40 flex items-end gap-2">
      {[35, 55, 40, 70, 50, 85, 60, 75].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex-1 bg-blue-500/20 rounded-t-sm hover:bg-blue-500 transition-colors"
        />
      ))}
    </div>
  </div>
);
