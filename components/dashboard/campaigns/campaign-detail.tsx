"use client";

import { useRouter } from "next/navigation";
import { useGetData } from "@/hooks/use-get-data";
import { usePostData } from "@/hooks/use-post-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Play,
  Edit,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Target,
  Calendar,
  BarChart3,
  Rocket,
  ListFilter,
  Code,
  Users,
  Briefcase,
  Heart,
  GraduationCap,
  PieChart,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";
import { TargetAudienceTable } from "@/components/dashboard/campaigns/target-audience/target-audience-table";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EDUCATION_OPTIONS, JOB_OPTIONS, MARITAL_OPTIONS } from "./_data/const";

interface CampaignDetailProps {
  id: string;
}

export function CampaignDetail({ id }: CampaignDetailProps) {
  const router = useRouter();

  const {
    data: campaign,
    isLoading,
    refetch,
  } = useGetData<any>(["campaigns", id], `/campaigns/${id}`);

  const { mutate: runCampaign, isPending: isRunning } = usePostData(
    `/campaigns/${id}/run`,
    [
      ["campaigns", id],
      ["campaign-targets", id],
    ],
    {
      onSuccess: (res: any) => {
        toast.success(
          `Simulation complete! Success rate: ${(res.rate * 100).toFixed(1)}%`
        );
        refetch();
      },
      onError: () => toast.error("Failed to run simulation"),
    }
  );

  if (isLoading) return <CampaignDetailSkeleton />;

  const total = campaign.totalTargets || 0;
  const yes = campaign.yesCount || 0;
  const no = campaign.noCount || 0;
  const rateValue = total > 0 ? (yes / total) * 100 : 0;
  const conversionRate = rateValue.toFixed(1);

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 w-full max-w-[100vw] overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/campaigns")}
            className="h-9 w-9 rounded-xl border-slate-200 dark:border-zinc-800 shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {campaign.name}
            </h1>

            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span className="font-mono bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md text-xs">
                {campaign.id}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(campaign.createdAt), "MMM dd, yyyy")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            asChild
            className="h-10 rounded-full flex-1 md:flex-none"
          >
            <Link href={`/dashboard/campaigns/${id}/update`}>
              <Edit className="mr-2 h-4 w-4" />
              Update Criteria
            </Link>
          </Button>

          <Button
            onClick={() => runCampaign({})}
            disabled={isRunning}
            className="h-10 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 rounded-full flex-1 md:flex-none"
          >
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4 fill-current" />
                Run Simulation
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <Card className="md:col-span-4 border-l-4 border-l-blue-500 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight">
                {conversionRate}%
              </span>
              <span className="text-sm text-muted-foreground">probability</span>
            </div>
            <div className="mt-4 h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${rateValue}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-5 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <PieChart className="h-4 w-4 text-slate-500" />
              Outcome Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  Success
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">
                    {yes}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  Fail
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-slate-500">
                    {no}
                  </span>
                  <div className="h-4 w-4 rounded-full border border-slate-300" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-green-500 h-full transition-all duration-1000"
                style={{
                  width: total > 0 ? `${(yes / total) * 100}%` : "0%",
                }}
              />
              <div
                className="bg-slate-200 dark:bg-zinc-700 h-full transition-all duration-1000"
                style={{
                  width: total > 0 ? `${(no / total) * 100}%` : "100%",
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 shadow-sm bg-slate-50 dark:bg-zinc-900/50 rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              Total Reach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Matching customers
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
        <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
          <Card className="border-slate-200 dark:border-zinc-800 shadow-sm rounded-xl overflow-hidden h-full">
            <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <ListFilter className="h-4 w-4" /> Criteria Rules
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                <CriteriaRow
                  icon={<Users className="h-4 w-4 text-slate-500" />}
                  label="Age Range"
                  content={
                    campaign.criteria?.age ? (
                      <span className="font-mono text-sm">
                        {campaign.criteria.age.gte || "0"} -{" "}
                        {campaign.criteria.age.lte || "∞"}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">
                        All ages
                      </span>
                    )
                  }
                />

                <CriteriaRow
                  icon={<Briefcase className="h-4 w-4 text-slate-500" />}
                  label="Target Jobs"
                  content={
                    <TagsList
                      items={campaign.criteria?.job?.in}
                      fallback="All Jobs"
                    />
                  }
                />

                <CriteriaRow
                  icon={<Heart className="h-4 w-4 text-slate-500" />}
                  label="Marital Status"
                  content={
                    <TagsList
                      items={campaign.criteria?.marital?.in}
                      fallback="All Statuses"
                    />
                  }
                />

                <CriteriaRow
                  icon={<GraduationCap className="h-4 w-4 text-slate-500" />}
                  label="Education"
                  content={
                    <TagsList
                      items={campaign.criteria?.education?.in}
                      fallback="All Levels"
                    />
                  }
                />

                <div className="p-4 grid grid-cols-2 gap-3 bg-slate-50/30 dark:bg-zinc-900/30">
                  <BinaryFilter
                    label="Housing Loan"
                    val={campaign.criteria?.housing}
                  />
                  <BinaryFilter
                    label="Personal Loan"
                    val={campaign.criteria?.loan}
                  />
                </div>

                <div className="p-4">
                  <details className="group">
                    <summary className="flex items-center gap-2 text-xs font-medium text-muted-foreground cursor-pointer select-none group-hover:text-foreground transition-colors">
                      <Code className="h-3 w-3" /> View Raw Config
                    </summary>
                    <div className="mt-3 rounded-lg bg-slate-950 p-3 overflow-x-auto border border-slate-800">
                      <pre className="text-[10px] font-mono text-green-400">
                        {JSON.stringify(campaign.criteria, null, 2)}
                      </pre>
                    </div>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8 order-1 lg:order-2 min-w-0">
          {total === 0 ? (
            <Card className="h-full border-dashed border-2 border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/20 shadow-none flex flex-col items-center justify-center p-12 text-center">
              <div className="p-4 bg-white dark:bg-zinc-900 rounded-full shadow-sm mb-4 border border-slate-100 dark:border-zinc-800">
                <BarChart3 className="h-8 w-8 text-blue-300 dark:text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Ready to Simulate
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2 mb-8">
                This campaign hasn&apos;t been run yet. Start the simulation to
                process customer data and generate predictive scores.
              </p>
              <Button
                onClick={() => runCampaign({})}
                disabled={isRunning}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-4 w-4 fill-current" />
                    Start Simulation
                  </>
                )}
              </Button>
            </Card>
          ) : (
            <TargetAudienceTable campaignId={id} />
          )}
        </div>
      </div>
    </div>
  );
}

function CriteriaRow({
  icon,
  label,
  content,
}: {
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {icon} {label}
      </div>
      <div className="pl-6">{content}</div>
    </div>
  );
}

function TagsList({ items, fallback }: { items?: string[]; fallback: string }) {
  if (!items || items.length === 0) {
    return (
      <span className="text-sm text-muted-foreground italic">{fallback}</span>
    );
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => {
        const label =
          JOB_OPTIONS.find((o) => o.value === item)?.label ||
          EDUCATION_OPTIONS.find((o) => o.value === item)?.label ||
          MARITAL_OPTIONS.find((o) => o.value === item)?.label ||
          item;
        return (
          <Badge
            key={item}
            variant="outline"
            className="capitalize font-normal text-xs bg-white dark:bg-zinc-900 rounded-md"
          >
            {label.replace(".", " ")}
          </Badge>
        );
      })}
    </div>
  );
}

function BinaryFilter({ label, val }: { label: string; val?: string }) {
  if (!val || val === "all") return null;
  const isYes = val === "yes";
  return (
    <div
      className={`flex flex-col gap-1 p-2 rounded-lg border text-center ${
        isYes
          ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900/30"
          : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900/30"
      }`}
    >
      <span className="text-[10px] font-semibold text-muted-foreground uppercase">
        {label}
      </span>
      <span
        className={`text-sm font-bold ${
          isYes ? "text-green-700" : "text-red-700"
        }`}
      >
        {val.toUpperCase()}
      </span>
    </div>
  );
}

function CampaignDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-full bg-slate-100 dark:bg-zinc-800 rounded-xl animate-pulse" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4 h-32 bg-slate-100 dark:bg-zinc-800 rounded-xl animate-pulse" />
        <div className="col-span-12 md:col-span-5 h-32 bg-slate-100 dark:bg-zinc-800 rounded-xl animate-pulse" />
        <div className="col-span-12 md:col-span-3 h-32 bg-slate-100 dark:bg-zinc-800 rounded-xl animate-pulse" />
      </div>
      <div className="grid grid-cols-12 gap-6 h-96">
        <div className="col-span-12 lg:col-span-4 bg-slate-100 dark:bg-zinc-800 rounded-xl animate-pulse" />
        <div className="col-span-12 lg:col-span-8 bg-slate-100 dark:bg-zinc-800 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
