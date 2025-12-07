"use client";

import { useMemo } from "react";
import { useGetData } from "@/hooks/use-get-data";
import { motion } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Cpu,
  Target,
  TrendingUp,
  Server,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type RawApiShape = {
  data?: any;
} & Record<string, any>;

type ModelInfoData = {
  generated_at?: string;
  model_name?: string;
  performance?: {
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1_score?: number;
    auc?: number;
  };
  performance_percentage?: {
    accuracy?: string;
    precision?: string;
    recall?: string;
    f1_score?: string;
    auc?: string;
  };
  business_impact_stats_percentage?: {
    model_auc_score?: string;
    predicted_positive_rate?: string;
    actual_positive_rate?: string;
  };
};

const safeNum = (v: any) => {
  if (v == null) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const stripped = v.trim().replace("%", "");
    const n = Number(stripped);
    if (!Number.isNaN(n)) return n;
  }
  return 0;
};

const ensurePercentString = (v: any) => {
  if (v == null) return "0%";
  if (typeof v === "string") {
    if (v.includes("%")) return v;
    const n = Number(v);
    if (!Number.isNaN(n)) return `${n}%`;
    return v;
  }
  if (typeof v === "number") {
    if (v >= 0 && v <= 1) return `${(v * 100).toFixed(2)}%`;
    return `${v}%`;
  }
  return "0%";
};

export const ModelPerformanceSection = () => {
  const { data: raw, isLoading } = useGetData<RawApiShape>(
    ["model-info-full"],
    "/ml/info",
    undefined,
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const modelData: ModelInfoData = useMemo(() => {
    if (!raw) return {};
    const candidate = raw.data ?? raw;
    return candidate as ModelInfoData;
  }, [raw]);

  const formattedDate = useMemo(() => {
    const src = modelData?.generated_at;
    if (!src) return "Syncing...";
    try {
      const iso = src.includes("T") ? src : src.replace(" ", "T");
      return format(new Date(iso), "MMM dd, HH:mm");
    } catch (e) {
      return src;
    }
  }, [modelData?.generated_at]);

  const metrics = useMemo(() => {
    const accNum = safeNum(modelData?.performance?.accuracy);
    const precNum = safeNum(modelData?.performance?.precision);
    const recNum = safeNum(modelData?.performance?.recall);
    const aucNum = safeNum(modelData?.performance?.auc);

    const toPct = (n: number) => (n > 0 && n <= 1 ? n * 100 : n);

    return [
      {
        label: "Accuracy",
        value: toPct(accNum),
        display: ensurePercentString(
          modelData?.performance_percentage?.accuracy ??
            `${toPct(accNum).toFixed(2)}%`
        ),
        desc: "Global Correctness",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        icon: CheckCircle2,
      },
      {
        label: "Precision",
        value: toPct(precNum),
        display: ensurePercentString(
          modelData?.performance_percentage?.precision ??
            `${toPct(precNum).toFixed(2)}%`
        ),
        desc: "Trustworthiness",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        icon: Target,
      },
      {
        label: "Recall",
        value: toPct(recNum),
        display: ensurePercentString(
          modelData?.performance_percentage?.recall ??
            `${toPct(recNum).toFixed(2)}%`
        ),
        desc: "Opportunity Capture",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        icon: Activity,
      },
      {
        label: "AUC Score",
        value: toPct(aucNum),
        display: ensurePercentString(
          modelData?.performance_percentage?.auc ??
            `${toPct(aucNum).toFixed(2)}%`
        ),
        desc: "Separability",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        icon: TrendingUp,
      },
    ];
  }, [modelData]);

  return (
    <section className="py-24 relative overflow-hidden bg-zinc-50/50 dark:bg-[#0a0a0a]">
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Built on <span className="text-primary">Transparent AI</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We believe in explaining our predictions. Monitor the real-time
            health and accuracy of the models driving your business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">
            <Card className="h-full border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-xl shadow-black/5 flex flex-col justify-between overflow-hidden relative group">
              <CardContent className="p-6 space-y-8 relative z-10">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                    <BrainCircuit className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Model Status
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      System Health
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-zinc-100/80 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <Cpu className="w-3 h-3" /> Active Model
                    </div>
                    <div
                      className="font-mono text-sm font-medium truncate"
                      title={modelData?.model_name}
                    >
                      {isLoading ? (
                        <Skeleton className="h-5 w-24" />
                      ) : (
                        modelData?.model_name ?? "Classifier_v1"
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-100/80 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <Clock className="w-3 h-3" /> Last Trained
                    </div>
                    <div className="font-mono text-sm font-medium">
                      {isLoading ? (
                        <Skeleton className="h-5 w-20" />
                      ) : (
                        formattedDate
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground/80">
                      API Latency
                    </span>
                    <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                      ~120ms
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={cn(
                    "h-full border-black/5 dark:border-white/10 bg-white dark:bg-black/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group",
                    metric.border
                  )}
                >
                  <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className={cn("p-2.5 rounded-xl", metric.bg)}>
                        <metric.icon className={cn("w-5 h-5", metric.color)} />
                      </div>
                    </div>

                    <div>
                      <div className="text-3xl font-bold tracking-tight mb-1 text-foreground">
                        {isLoading ? (
                          <Skeleton className="h-8 w-16" />
                        ) : (
                          metric.display
                        )}
                      </div>
                      <h4 className="font-semibold text-sm text-foreground/80">
                        {metric.label}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {metric.desc}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-black/5 dark:bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${Math.max(
                            0,
                            Math.min(100, Number(metric.value || 0))
                          )}%`,
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={cn(
                          "h-full",
                          metric.color.replace("text-", "bg-")
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="sm:col-span-2 lg:col-span-4 mt-2"
            >
              <Card className="bg-primary text-primary-foreground border-none shadow-2xl relative overflow-hidden">
                <CardContent className="p-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-start gap-5">
                    <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner border border-white/20">
                      <Server className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">
                          Business Impact Analysis
                        </h3>
                        <div className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md rounded-full px-2 py-1 text-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Verified
                        </div>
                      </div>
                      <p className="text-primary-foreground/80 text-base max-w-xl leading-relaxed">
                        The model identifies{" "}
                        <span className="font-bold text-white border-b border-white/30">
                          {modelData?.business_impact_stats_percentage
                            ?.predicted_positive_rate ?? "..."}
                        </span>{" "}
                        of your customer base as high-value targets, aligning
                        perfectly with your actual market density of{" "}
                        {modelData?.business_impact_stats_percentage
                          ?.actual_positive_rate ?? "..."}
                        .
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 min-w-fit">
                    <div className="text-right">
                      <span className="text-xs text-primary-foreground/60 uppercase font-bold tracking-wider">
                        AUC Score
                      </span>
                      <div className="text-4xl font-bold tracking-tight">
                        {modelData?.business_impact_stats_percentage
                          ?.model_auc_score ?? "..."}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
