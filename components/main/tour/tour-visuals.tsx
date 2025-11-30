"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, Badge } from "lucide-react";

export const UploadStep = () => (
  <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl bg-slate-50/50 dark:bg-zinc-900/50 p-8">
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600"
    >
      <FileSpreadsheet className="w-10 h-10" />
    </motion.div>
    <p className="font-semibold text-lg">Drop your customer_data.csv here</p>
    <p className="text-sm text-muted-foreground mt-2">
      Supported: CSV, Excel (Max 10MB)
    </p>
    <div className="mt-6 w-full max-w-xs space-y-2">
      <div className="h-2 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-full bg-blue-600 rounded-full"
        />
      </div>
      <p className="text-xs text-center text-muted-foreground">Uploading...</p>
    </div>
  </div>
);

export const ProcessingStep = () => (
  <div className="h-full flex flex-col items-center justify-center bg-slate-50/50 dark:bg-zinc-900/50 rounded-xl border border-slate-200 dark:border-zinc-800 p-8 relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-zinc-800/50 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
    <div className="relative z-10 grid gap-4 w-full max-w-sm">
      {[
        { label: "Parsing demographics...", color: "text-blue-500" },
        { label: "Fetching EURIBOR 3m rates...", color: "text-purple-500" },
        { label: "Running Random Forest Model...", color: "text-orange-500" },
        { label: "Generating confidence scores...", color: "text-green-500" },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.8 }}
          className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-950 rounded-lg border shadow-sm"
        >
          <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0 text-muted-foreground" />
          <span className={`text-sm font-medium ${item.color}`}>
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  </div>
);

export const ResultStep = () => (
  <div className="h-full flex flex-col bg-white dark:bg-zinc-950 rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xl">
    <div className="p-4 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex justify-between items-center">
      <span className="font-bold text-sm">Analysis Result</span>
      <Badge className="bg-green-100 text-green-700 border-green-200">
        Complete
      </Badge>
    </div>
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Customer</p>
          <p className="font-bold text-lg">John Doe</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Prediction</p>
          <p className="font-bold text-xl text-green-600">YES</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Confidence Score</span>
          <span className="font-bold">92.5%</span>
        </div>
        <div className="h-3 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "92.5%" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-green-600"
          />
        </div>
      </div>
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30 text-xs text-blue-700 dark:text-blue-300">
        <strong>Recommendation:</strong> High priority lead. Schedule a call
        immediately.
      </div>
    </div>
  </div>
);
