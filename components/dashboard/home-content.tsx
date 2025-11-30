"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  Target,
  PieChart as PieIcon,
  Download,
  Sparkles,
  Briefcase,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import Link from "next/link";

import { useGetData } from "@/hooks/use-get-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-3 rounded-xl shadow-xl">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2 capitalize">
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs mb-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-slate-500 dark:text-slate-400 capitalize">
              {entry.name}:
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function HomeContent() {
  const [trendGroup, setTrendGroup] = useState<"month" | "week">("month");

  const { data: overview, isLoading: loadingOverview } = useGetData<any>(
    ["analytics", "overview"],
    "/analytics/overview"
  );

  const { data: trendData, isLoading: loadingTrend } = useGetData<any[]>(
    ["analytics", "trend", trendGroup],
    "/analytics/trend",
    { groupBy: trendGroup }
  );

  const { data: jobData, isLoading: loadingJob } = useGetData<any[]>(
    ["analytics", "by-job"],
    "/analytics/by-job"
  );

  const isLoading = loadingOverview || loadingTrend || loadingJob;

  const topJob = useMemo(() => {
    if (!jobData || jobData.length === 0) return null;

    return jobData.reduce((prev, current) => {
      return prev.yes > current.yes ? prev : current;
    });
  }, [jobData]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const total = overview?.totalCustomers || 0;
  const yes = overview?.predictions?.yes || 0;
  const no = overview?.predictions?.no || 0;
  const campaigns = overview?.campaigns || 0;

  const conversionRate = total > 0 ? ((yes / total) * 100).toFixed(1) : "0.0";

  const leadsPerCampaign = campaigns > 0 ? Math.round(yes / campaigns) : 0;

  const pieData = [
    { name: "High Probability", value: yes, color: "#2563eb" },
    { name: "Low Probability", value: no, color: "#94a3b8" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white dark:bg-zinc-950 p-6 rounded-3xl transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Real-time predictive analytics overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="font-semibold shadow-lg transition-all hover:scale-105"
          >
            <Link href="/dashboard/predictions/create">
              <Sparkles className="mr-2 h-4 w-4" /> New Prediction
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Analysis
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{total.toLocaleString()}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              All extracted customers
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Potential Leads
            </CardTitle>
            <Target className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{yes.toLocaleString()}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Predicted to convert (YES)
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Top Segment
            </CardTitle>
            <Briefcase className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold capitalize truncate">
              {topJob ? topJob.job.replace(".", "") : "N/A"}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {topJob ? `${topJob.yes} leads generated` : "Waiting for data"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Active Campaigns
            </CardTitle>
            <PieIcon className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{campaigns}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Marketing initiatives
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 lg:col-span-5 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-colors">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-slate-100">
              Prediction Trends
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Customer intent analysis over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <Tabs
              defaultValue="month"
              value={trendGroup}
              onValueChange={(v) => setTrendGroup(v as "month" | "week")}
              className="space-y-4"
            >
              <div className="flex items-center justify-between px-6">
                <TabsList className="bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-1">
                  <TabsTrigger
                    value="month"
                    className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 data-[state=active]:shadow-sm text-slate-500 dark:text-slate-400"
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="week"
                    className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 data-[state=active]:shadow-sm text-slate-500 dark:text-slate-400"
                  >
                    Weekly
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={trendGroup} className="space-y-4 px-2">
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trendData || []} barGap={8}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#94a3b8"
                        opacity={0.2}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="bucket"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dx={-10}
                      />
                      <Tooltip
                        cursor={{ fill: "#f1f5f9", opacity: 0.1 }}
                        content={<CustomTooltip />}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ paddingTop: "20px" }}
                      />
                      <Bar
                        dataKey="yes"
                        name="High Probability"
                        fill="#2563eb"
                        radius={[4, 4, 4, 4]}
                        barSize={28}
                      />
                      <Bar
                        dataKey="no"
                        name="Low Probability"
                        fill="#cbd5e1"
                        radius={[4, 4, 4, 4]}
                        barSize={28}
                        className="dark:fill-zinc-700"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="col-span-7 lg:col-span-2 flex flex-col gap-4">
          <Card className="flex-1 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-colors">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-100">
                Overall Ratio
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Likelihood distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          className="stroke-transparent"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    {conversionRate}%
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                    Success Rate
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-colors">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-100">
                Efficiency
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Avg. leads per campaign
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-2">
                <div className="p-3 rounded-xl bg-orange-600/10 text-orange-500 border border-orange-600/20">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    ~{leadsPerCampaign} Leads
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    High impact results
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-colors">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">
            Performance by Job
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Which professions yield the best results?
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-0">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={jobData || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={24}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#94a3b8"
                  opacity={0.2}
                  vertical={false}
                />
                <XAxis
                  dataKey="job"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                  tickFormatter={(val) =>
                    val.length > 8
                      ? val.slice(0, 8).charAt(0).toUpperCase() +
                        val.slice(1, 8) +
                        "..."
                      : val.charAt(0).toUpperCase() + val.slice(1)
                  }
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "#f1f5f9", opacity: 0.1 }}
                />
                <Bar
                  dataKey="yes"
                  name="High Prob"
                  fill="#2563eb"
                  radius={[4, 4, 4, 4]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Skeleton className="col-span-7 lg:col-span-5 h-[400px] rounded-xl" />
        <div className="col-span-7 lg:col-span-2 flex flex-col gap-4">
          <Skeleton className="flex-1 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>

      <Skeleton className="h-[350px] w-full rounded-xl" />
    </div>
  );
}
