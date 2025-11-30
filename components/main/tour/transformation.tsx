"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertCircle, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Import Shadcn
import { cn } from "@/lib/utils";

const spreadsheetRows = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  name: [
    "John Doe",
    "Sarah Smith",
    "Mike Johnson",
    "Emily Davis",
    "Chris Wilson",
    "Anna Brown",
    "David Miller",
    "Lisa Taylor",
  ][i],
  job: [
    "admin.",
    "technician",
    "blue-collar",
    "services",
    "management",
    "retired",
    "unknown",
    "student",
  ][i],
  balance: [
    "$1,200",
    "$540",
    "$2,300",
    "$890",
    "$12,000",
    "$4,500",
    "$120",
    "$900",
  ][i],
  status: [
    "???",
    "Unknown",
    "Pending",
    "???",
    "Maybe",
    "Call later",
    "No answer",
    "???",
  ][i],
}));

const smartBankRows = [
  {
    id: 1,
    name: "Chris Wilson",
    score: 98,
    status: "Highly Likely",
    reason: "High Balance + Mgmt Job",
  },
  {
    id: 2,
    name: "Anna Brown",
    score: 85,
    status: "Likely",
    reason: "Retired + Good History",
  },
  {
    id: 3,
    name: "Mike Johnson",
    score: 72,
    status: "Moderate",
    reason: "Stable Income",
  },
];

export const Transformation = () => {
  const [isSmart, setIsSmart] = useState(false);

  return (
    <section className="py-24 bg-secondary/5 border-y border-border relative overflow-hidden">
      <div className="container px-4 mx-auto text-center max-w-5xl">
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Stop drowning in{" "}
            <span
              className={cn(
                "transition-colors duration-500",
                isSmart
                  ? "text-red-500 line-through opacity-50"
                  : "text-foreground"
              )}
            >
              Spreadsheets
            </span>
            <br />
            Start acting on{" "}
            <span
              className={cn(
                "transition-colors duration-500",
                isSmart ? "text-primary" : "opacity-50"
              )}
            >
              Insights
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Toggle the switch below to see the difference SmartBank makes in
            your daily workflow.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                !isSmart ? "text-foreground" : "text-muted-foreground"
              )}
            >
              The Old Way
            </span>
            <Switch
              checked={isSmart}
              onCheckedChange={setIsSmart}
              className="data-[state=checked]:bg-primary scale-125"
            />
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                isSmart ? "text-primary" : "text-muted-foreground"
              )}
            >
              The SmartBank Way
            </span>
          </div>
        </div>

        <div className="relative h-[600px] w-full bg-background rounded-2xl border shadow-2xl overflow-hidden transition-all duration-500 flex flex-col">
          <div className="h-10 bg-secondary/50 border-b flex items-center px-4 gap-2 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
              <div className="w-3 h-3 rounded-full bg-green-400/50" />
            </div>
            <div className="ml-4 text-xs text-muted-foreground font-mono opacity-50">
              {isSmart
                ? "dashboard.smartbank.ai"
                : "customer_leads_final_v2_fixed.xlsx"}
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden bg-slate-50 dark:bg-zinc-950/50">
            <AnimatePresence mode="wait">
              {!isSmart ? (
                <motion.div
                  key="spreadsheet"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col p-4 md:p-8"
                >
                  <div className="flex items-center justify-center gap-2 mb-4 text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg w-fit mx-auto shadow-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Chaos Mode
                    </span>
                  </div>

                  <ScrollArea className="flex-1 w-full border rounded-lg bg-white dark:bg-zinc-900 shadow-sm">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-4 bg-slate-100 dark:bg-zinc-800 p-3 font-bold text-sm border-b sticky top-0 z-10">
                        <div>Name</div>
                        <div>Job</div>
                        <div>Balance</div>
                        <div>Likelihood?</div>
                      </div>
                      <div className="text-sm font-mono">
                        {spreadsheetRows.map((row) => (
                          <div
                            key={row.id}
                            className="grid grid-cols-4 p-3 border-b last:border-0 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors"
                          >
                            <div className="truncate pr-2">{row.name}</div>
                            <div className="truncate text-muted-foreground pr-2">
                              {row.job}
                            </div>
                            <div className="truncate text-muted-foreground pr-2">
                              {row.balance}
                            </div>
                            <div className="text-red-500 dark:text-red-400 font-medium">
                              {row.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </motion.div>
              ) : (
                <motion.div
                  key="smartbank"
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col items-center p-4 md:p-8"
                >
                  <div className="flex items-center gap-2 mb-8 text-primary bg-primary/10 p-2 rounded-lg w-fit shadow-sm">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Clarity Mode
                    </span>
                  </div>

                  <ScrollArea className="w-full max-w-2xl h-full pr-4">
                    <div className="grid gap-4 pb-16">
                      {smartBankRows.map((row, i) => (
                        <motion.div
                          key={row.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 rounded-xl border bg-white dark:bg-zinc-900 shadow-sm hover:border-primary/50 hover:shadow-md transition-all gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg shrink-0">
                              {row.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-base md:text-lg">
                                {row.name}
                              </h4>
                              <p className="text-xs md:text-sm text-muted-foreground">
                                {row.reason}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between w-full sm:w-auto gap-6 pl-14 sm:pl-0">
                            <div className="text-left sm:text-right">
                              <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                                Probability
                              </div>
                              <div className="font-bold text-lg md:text-xl text-primary">
                                {row.score}%
                              </div>
                            </div>
                            <Badge className="bg-green-500 hover:bg-green-600 text-sm py-1 px-3">
                              <Check className="w-3 h-3 mr-1" /> {row.status}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-4 text-sm text-muted-foreground bg-slate-100 dark:bg-zinc-800/50 py-2 rounded-lg"
                      >
                        + 4,320 other low-priority leads automatically filtered
                        out.
                      </motion.div>
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
