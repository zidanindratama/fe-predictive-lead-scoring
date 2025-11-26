"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Target,
  PieChart as PieIcon,
  Download,
  TrendingUp,
  Sparkles,
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

const overviewData = {
  totalCustomers: 1240,
  predictions: { yes: 850, no: 390 },
  campaigns: 8,
};

const monthlyData = [
  { bucket: "Jan", yes: 45, no: 30 },
  { bucket: "Feb", yes: 52, no: 28 },
  { bucket: "Mar", yes: 48, no: 35 },
  { bucket: "Apr", yes: 61, no: 20 },
  { bucket: "May", yes: 55, no: 25 },
  { bucket: "Jun", yes: 67, no: 15 },
  { bucket: "Jul", yes: 72, no: 18 },
  { bucket: "Aug", yes: 65, no: 22 },
];

const weeklyData = [
  { bucket: "Mon", yes: 12, no: 5 },
  { bucket: "Tue", yes: 18, no: 8 },
  { bucket: "Wed", yes: 15, no: 6 },
  { bucket: "Thu", yes: 22, no: 4 },
  { bucket: "Fri", yes: 25, no: 7 },
  { bucket: "Sat", yes: 10, no: 12 },
  { bucket: "Sun", yes: 8, no: 10 },
];

const jobData = [
  { job: "Admin", yes: 85, no: 0 },
  { job: "Tech", yes: 75, no: 0 },
  { job: "Mgmt", yes: 60, no: 0 },
  { job: "Blue-collar", yes: 40, no: 0 },
  { job: "Services", yes: 35, no: 0 },
  { job: "Retired", yes: 20, no: 0 },
];

const pieData = [
  { name: "High Probability", value: 68, color: "#2563eb" },
  { name: "Low Probability", value: 32, color: "#94a3b8" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-3 rounded-xl shadow-xl">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
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

const HomeContent = () => {
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
            variant="outline"
            className="hidden sm:flex border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-900 dark:text-slate-200"
          >
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button className="bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-semibold shadow-lg transition-all hover:scale-105">
            <Sparkles className="mr-2 h-4 w-4" /> New Prediction
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
            <div className="text-3xl font-bold">
              {overviewData.totalCustomers.toLocaleString("en-US")}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              +20.1% from last month
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
            <div className="text-3xl font-bold">
              {overviewData.predictions.yes.toLocaleString("en-US")}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(
                (overviewData.predictions.yes / overviewData.totalCustomers) *
                100
              ).toFixed(1)}
              %
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              +20.1% from last month
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
            <div className="text-3xl font-bold">{overviewData.campaigns}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              +20.1% from last month
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
            <Tabs defaultValue="monthly" className="space-y-4">
              <div className="flex items-center justify-between px-6">
                <TabsList className="bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-1">
                  <TabsTrigger
                    value="monthly"
                    className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 data-[state=active]:shadow-sm text-slate-500 dark:text-slate-400"
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="weekly"
                    className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 data-[state=active]:shadow-sm text-slate-500 dark:text-slate-400"
                  >
                    Weekly
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monthly" className="space-y-4 px-2">
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} barGap={8}>
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

              <TabsContent value="weekly" className="space-y-4 px-2">
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient
                          id="colorYesWeekly"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#2563eb"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2563eb"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
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
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="yes"
                        stroke="#2563eb"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorYesWeekly)"
                      />
                    </AreaChart>
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
                    68%
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
                Top Segment
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Highest conversion group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-2">
                <div className="p-3 rounded-xl bg-blue-600/10 text-blue-500 border border-blue-600/20">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Admin. & Tech
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    160+ Leads generated
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
                data={jobData}
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
};

export default HomeContent;
