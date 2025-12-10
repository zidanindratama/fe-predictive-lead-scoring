"use client";

import { useMemo } from "react";
import {
  BrainCircuit,
  Binary,
  ArrowRightLeft,
  Network,
  Cpu,
  Database,
} from "lucide-react";
import { SectionHeader, CodeBlock } from "../doc-ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";

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
};

const ensurePercentString = (v: any) => {
  if (v == null) return "N/A";
  if (typeof v === "string") {
    if (v.includes("%")) return v;
    const n = Number(v);
    if (!Number.isNaN(n)) return `${n}%`;
    return v;
  }
  if (typeof v === "number") {
    if (v >= 0 && v <= 1) return `${(v * 100).toFixed(1)}%`;
    return `${v}%`;
  }
  return "N/A";
};

const requestPayload = `{
  "personal_info": { 
    "age": 45, 
    "job": "admin", 
    "marital": "married",
    "education": "university.degree"
  },
  "financial_info": { 
    "default": false, 
    "housing": true, 
    "loan": false 
  },
  "macro_info": { 
    "euribor3m": 1.2, 
    "cpi": 93.2,
    "emp_var_rate": -1.8
  }
}`;

const responsePayload = `{
  "status_code": 200,
  "data": {
    "predicted_class": "YES",
    "probability_yes": 0.874,
    "probability_no": 0.126
  },
  "meta": {
    "model_version": "v1.0.2",
    "inference_time": "0.045s"
  }
}`;

export function MlSection() {
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

  return (
    <section id="ml-engine" className="scroll-mt-32">
      <SectionHeader
        title="ML Integration Logic"
        icon={BrainCircuit}
        description="The intelligence layer. How SmartBank bridges the gap between raw customer data and actionable AI predictions."
      />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-secondary/5 border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Binary className="w-5 h-5 text-blue-500" />
              1. Pre-Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Raw data from MongoDB is sanitized. Categorical strings (e.g.,
              "blue-collar") are validated against known schemas before
              normalization.
            </p>
            <Badge
              variant="outline"
              className="bg-blue-500/10 text-blue-600 border-blue-200"
            >
              NestJS Mapper
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-secondary/5 border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Network className="w-5 h-5 text-purple-500" />
              2. Inference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Data is sent to the Python microservice hosted on HuggingFace. The
              model (Random Forest/XGBoost) calculates probabilities.
            </p>
            <Badge
              variant="outline"
              className="bg-purple-500/10 text-purple-600 border-purple-200"
            >
              Scikit-Learn
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-secondary/5 border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="w-5 h-5 text-green-500" />
              3. Persistence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              The result (YES/NO) and confidence score are stored in the
              `Prediction` table, linked to the Customer ID for history
              tracking.
            </p>
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-600 border-green-200"
            >
              Prisma Write
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <Tabs defaultValue="request" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4" />
                API Contract
              </h3>
              <TabsList className="h-8">
                <TabsTrigger value="request" className="text-xs">
                  Request
                </TabsTrigger>
                <TabsTrigger value="response" className="text-xs">
                  Response
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="request" className="mt-0">
              <div className="relative rounded-xl overflow-hidden border border-border">
                <div className="bg-muted/50 px-4 py-2 border-b text-xs font-mono text-muted-foreground flex justify-between">
                  <span>POST /api/predict</span>
                  <span className="text-blue-500">JSON</span>
                </div>
                <CodeBlock code={requestPayload} lang="json" />
              </div>
            </TabsContent>

            <TabsContent value="response" className="mt-0">
              <div className="relative rounded-xl overflow-hidden border border-border">
                <div className="bg-muted/50 px-4 py-2 border-b text-xs font-mono text-muted-foreground flex justify-between">
                  <span>200 OK</span>
                  <span className="text-green-500">JSON</span>
                </div>
                <CodeBlock code={responsePayload} lang="json" />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                Live Specs
              </h3>
              {isLoading && (
                <Badge variant="outline" className="text-[10px]">
                  Syncing...
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Algorithm</span>
                <span className="text-sm font-medium">
                  {isLoading ? (
                    <Skeleton className="h-4 w-24" />
                  ) : (
                    modelData?.model_name || "Random Forest"
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">
                  Training Accuracy
                </span>
                <span className="text-sm font-bold text-green-500">
                  {isLoading ? (
                    <Skeleton className="h-4 w-12" />
                  ) : (
                    ensurePercentString(
                      modelData?.performance_percentage?.accuracy ||
                        modelData?.performance?.accuracy
                    )
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">AUC Score</span>
                <span className="text-sm font-medium text-blue-500">
                  {isLoading ? (
                    <Skeleton className="h-4 w-12" />
                  ) : (
                    ensurePercentString(
                      modelData?.performance_percentage?.auc ||
                        modelData?.performance?.auc
                    )
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Hosting</span>
                <span className="text-sm font-medium">HuggingFace</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">
                  Avg Latency
                </span>
                <span className="text-sm font-medium">~150ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Input Features
                </span>
                <span className="text-sm font-medium">21 Dimensions</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex gap-3">
              <div className="mt-0.5">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                  Context Aware
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  The model doesn't just look at the user. It pulls real-time{" "}
                  <strong>Euribor 3M</strong> and <strong>CPI</strong> rates to
                  adjust predictions based on current economic conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
