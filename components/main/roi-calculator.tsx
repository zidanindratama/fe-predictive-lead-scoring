"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, DollarSign, TrendingUp, Users } from "lucide-react";

export const ROICalculator = () => {
  const [leads, setLeads] = useState([1000]);
  const [dealValue, setDealValue] = useState([5000]);
  const [currentConv, setCurrentConv] = useState([2.5]);

  const [revenueCurrent, setRevenueCurrent] = useState(0);
  const [revenueWithAI, setRevenueWithAI] = useState(0);
  const [uplift, setUplift] = useState(0);

  const AI_IMPACT_FACTOR = 1.35;

  useEffect(() => {
    const leadsVal = leads[0];
    const valueVal = dealValue[0];
    const convVal = currentConv[0] / 100;

    const current = leadsVal * convVal * valueVal;

    const projected = current * AI_IMPACT_FACTOR;

    setRevenueCurrent(Math.round(current));
    setRevenueWithAI(Math.round(projected));
    setUplift(Math.round(projected - current));
  }, [leads, dealValue, currentConv]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium mb-6"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate Your Growth</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See the impact on your <br />
            <span className="text-primary">Bottom Line</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Adjust the sliders below to see how much additional revenue
            SmartBank could generate for your institution based on our average
            performance metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <Card className="h-full border-border/50 bg-secondary/10 backdrop-blur-sm p-6 md:p-8">
              <CardContent className="space-y-10 pt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 font-medium text-foreground">
                      <Users className="w-4 h-4 text-primary" /> Monthly Leads
                    </label>
                    <span className="font-mono text-lg font-bold bg-background border border-border px-3 py-1 rounded-md">
                      {leads[0].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[1000]}
                    max={10000}
                    step={100}
                    value={leads}
                    onValueChange={setLeads}
                    className="py-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of potential customers processed per month.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 font-medium text-foreground">
                      <DollarSign className="w-4 h-4 text-primary" /> Avg. Deal
                      Value
                    </label>
                    <span className="font-mono text-lg font-bold bg-background border border-border px-3 py-1 rounded-md">
                      ${dealValue[0].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[5000]}
                    max={50000}
                    step={500}
                    value={dealValue}
                    onValueChange={setDealValue}
                    className="py-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Average revenue generated from a closed deal (e.g., Loan
                    size or LTV).
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 font-medium text-foreground">
                      <TrendingUp className="w-4 h-4 text-primary" /> Conversion
                      Rate
                    </label>
                    <span className="font-mono text-lg font-bold bg-background border border-border px-3 py-1 rounded-md">
                      {currentConv[0]}%
                    </span>
                  </div>
                  <Slider
                    defaultValue={[2.5]}
                    max={20}
                    step={0.1}
                    value={currentConv}
                    onValueChange={setCurrentConv}
                    className="py-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your current percentage of leads that become customers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="flex-1 bg-linear-to-br from-primary to-blue-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 space-y-2 mb-8">
                <p className="text-blue-100 font-medium text-sm uppercase tracking-wider">
                  Projected Monthly Revenue
                </p>
                <motion.div
                  key={revenueWithAI}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl md:text-6xl font-bold tracking-tighter"
                >
                  {formatCurrency(revenueWithAI)}
                </motion.div>
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>+35% Improvement with AI</span>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
                <div>
                  <p className="text-blue-200 text-xs mb-1">Current Revenue</p>
                  <p className="font-mono text-xl opacity-80">
                    {formatCurrency(revenueCurrent)}
                  </p>
                </div>
                <div>
                  <p className="text-green-300 text-xs mb-1 font-bold">
                    Extra Revenue / Month
                  </p>
                  <p className="font-mono text-xl text-green-300 font-bold">
                    +{formatCurrency(uplift)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-6 flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-secondary rounded-xl shrink-0">
                <Calculator className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Why this matters?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Most banks lose revenue by focusing on low-probability leads.
                  SmartBank filters noise, letting your team focus only on
                  high-value targets.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
