"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowLeft,
  User,
  Briefcase,
  GraduationCap,
  Heart,
  Calendar,
  BrainCircuit,
  CheckCircle2,
  XCircle,
  Clock,
  Hash,
  Activity,
  Phone,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { cn } from "@/lib/utils";

interface PredictionDetailProps {
  id: string;
}

export function PredictionDetail({ id }: PredictionDetailProps) {
  const router = useRouter();

  const { data: prediction, isLoading: isPredictionLoading } = useGetData<any>(
    ["predictions", id],
    `/predictions/${id}`
  );

  const customerId = prediction?.customer?.id || prediction?.customerId;
  const { data: customer, isLoading: isCustomerLoading } = useGetData<any>(
    ["customers", customerId],
    `/customers/${customerId}`,
    undefined,
    { enabled: !!customerId }
  );

  if (isPredictionLoading || (customerId && isCustomerLoading)) {
    return <PredictionDetailSkeleton />;
  }

  const cust = customer || prediction?.customer || {};

  const isYes = prediction?.predictedClass === "YES";
  const probYes = (prediction?.probabilityYes || 0) * 100;
  const probNo = (prediction?.probabilityNo || 0) * 100;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-9 w-9 rounded-xl border-slate-200 dark:border-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Prediction Details
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Hash className="h-3 w-3" /> {id}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card className="border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden h-full">
            <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b pb-4">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500" />
                Customer Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                  Identity
                </p>
                <div className="font-bold text-xl text-foreground">
                  {cust.name || "Unknown"}
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground capitalize">
                  <Briefcase className="h-3.5 w-3.5" />
                  {cust.job?.replace(/\./g, " ") || "-"}
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">
                  Demographics
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" /> Age
                    </div>
                    <span className="font-medium">
                      {cust.age ? `${cust.age} Years` : "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Heart className="h-4 w-4" /> Marital
                    </div>
                    <span className="font-medium capitalize">
                      {cust.marital || "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="h-4 w-4" /> Education
                    </div>
                    <span
                      className="font-medium capitalize truncate max-w-[120px] text-right"
                      title={cust.education}
                    >
                      {cust.education?.replace(/\./g, " ") || "-"}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">
                  Financial Status
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg border bg-slate-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-center gap-1">
                    <span className="text-[10px] text-muted-foreground uppercase">
                      Housing
                    </span>
                    <Badge
                      variant={cust.housing === "yes" ? "default" : "secondary"}
                      className={cn(
                        "text-xs font-normal capitalize",
                        cust.housing === "yes"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200"
                          : ""
                      )}
                    >
                      {cust.housing || "No"}
                    </Badge>
                  </div>

                  <div className="p-2 rounded-lg border bg-slate-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-center gap-1">
                    <span className="text-[10px] text-muted-foreground uppercase">
                      Loan
                    </span>
                    <Badge
                      variant={
                        cust.loan === "yes" ? "destructive" : "secondary"
                      }
                      className={cn(
                        "text-xs font-normal capitalize",
                        cust.loan === "yes"
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200"
                          : ""
                      )}
                    >
                      {cust.loan || "No"}
                    </Badge>
                  </div>

                  <div className="col-span-2 p-2 rounded-lg border bg-slate-50 dark:bg-zinc-900/50 flex items-center justify-between px-3">
                    <span className="text-[10px] text-muted-foreground uppercase">
                      Credit Default
                    </span>
                    <span
                      className={cn(
                        "text-xs font-bold capitalize",
                        cust.default === "yes"
                          ? "text-red-600"
                          : "text-green-600"
                      )}
                    >
                      {cust.default || "no"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden border-slate-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-blue-600" />
                  Analysis Result
                </span>
                <Badge
                  variant="outline"
                  className="font-mono text-xs font-normal"
                >
                  Source: {prediction?.source || "AI_Model"}
                </Badge>
              </CardTitle>
              <CardDescription>
                Probabilistic classification based on extracted customer data.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div
                className={cn(
                  "flex items-center gap-4 p-6 rounded-xl border mb-8 transition-colors",
                  isYes
                    ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900"
                    : "bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800"
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-full shadow-sm",
                    isYes
                      ? "bg-white text-green-600 dark:bg-green-900 dark:text-green-300"
                      : "bg-white text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  )}
                >
                  {isYes ? (
                    <CheckCircle2 className="h-8 w-8" />
                  ) : (
                    <XCircle className="h-8 w-8" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Final Verdict
                  </p>
                  <h2
                    className={cn(
                      "text-3xl font-bold tracking-tight",
                      isYes
                        ? "text-green-700 dark:text-green-400"
                        : "text-slate-700 dark:text-slate-300"
                    )}
                  >
                    {isYes ? "Likely to Convert" : "Unlikely to Convert"}
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-green-700 dark:text-green-400 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Confidence YES
                    </span>
                    <span className="font-bold">{probYes.toFixed(2)}%</span>
                  </div>
                  <Progress
                    value={probYes}
                    className="h-3 bg-green-100 dark:bg-green-950/30 [&>div]:bg-green-600 dark:[&>div]:bg-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <XCircle className="h-4 w-4" /> Confidence NO
                    </span>
                    <span className="font-bold">{probNo.toFixed(2)}%</span>
                  </div>
                  <Progress
                    value={probNo}
                    className="h-3 bg-slate-100 dark:bg-slate-800 [&>div]:bg-slate-400 dark:[&>div]:bg-slate-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" /> Previous
                  Interaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-2xl font-bold capitalize">
                    {cust.poutcome || "Nonexistent"}
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {cust.previous || 0} contacts
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Outcome of the previous marketing campaign.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-500" /> Current Campaign
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-2xl font-bold">{cust.campaign || 0}</div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Contacts
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  Last contact:{" "}
                  <span className="font-medium text-foreground capitalize">
                    {cust.month || "-"} / {cust.day_of_week || "-"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {(cust.euribor3m || cust.cons_price_idx) && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Economic Context: Euribor3m{" "}
                <strong className="text-foreground">
                  {cust.euribor3m ?? "N/A"}
                </strong>{" "}
                • CPI{" "}
                <strong className="text-foreground">
                  {cust.cons_price_idx ?? "N/A"}
                </strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PredictionDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-8" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-[500px] w-full md:col-span-1 Economic Co-xl" />
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
