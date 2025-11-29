"use client";

import { useRouter } from "next/navigation";
import { useGetData } from "@/hooks/use-get-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Edit,
  Briefcase,
  GraduationCap,
  Heart,
  Calendar,
  User,
  Wallet,
  Phone,
  TrendingUp,
  Clock,
  Hash,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  JOB_OPTIONS, 
  MARITAL_OPTIONS, 
  EDUCATION_OPTIONS 
} from "./_data/const";
import { Customer } from "./_schema/schema";

interface CustomerDetailProps {
  id: string;
}

interface AuthUser { role?: string; }

export function CustomerDetail({ id }: CustomerDetailProps) {
  const router = useRouter();

  const { data: user } = useGetData<AuthUser>(["me"], "/auth/me");

  const {
    data: customer,
    isLoading,
  } = useGetData<Customer>(["customer", id], `/customers/${id}`);

  if (isLoading || !customer) return <CustomerDetailSkeleton />;

  const getLabel = (val: string, options: { value: string; label: string }[]) => {
    return options.find((o) => o.value === val)?.label || val;
  };

  const jobLabel = getLabel(customer.job, JOB_OPTIONS);
  const maritalLabel = getLabel(customer.marital, MARITAL_OPTIONS);
  const educationLabel = getLabel(customer.education, EDUCATION_OPTIONS);

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 w-full max-w-[100vw] overflow-x-hidden">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/customers")}
            className="h-9 w-9 rounded-xl border-slate-200 dark:border-zinc-800 shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {customer.name}
            </h1>

            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span className="font-mono bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md text-xs flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {customer.id}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Joined {format(new Date(customer.createdAt), "MMM dd, yyyy")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {user?.role !== "USER" && (
            <Button
              variant="outline"
              asChild
              className="h-10 rounded-full flex-1 md:flex-none bg-white dark:bg-zinc-950"
            >
              <Link href={`/dashboard/customers/${id}/update`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>  
          )}
          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        <Card className="md:col-span-4 border-l-4 border-l-green-500 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wallet className="h-4 w-4 text-green-500" />
              Financial Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-3 gap-2 text-center">
                <StatusBadge label="Credit" value={customer.creditDefault} />
                <StatusBadge label="Housing" value={customer.housing} />
                <StatusBadge label="Loan" value={customer.loan} />
             </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-5 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-500" />
              Last Campaign Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {customer.poutcome === 'success' ? (
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                    ) : customer.poutcome === 'failure' ? (
                        <XCircle className="h-8 w-8 text-red-500" />
                    ) : (
                        <HelpCircle className="h-8 w-8 text-slate-300" />
                    )}
                    <div>
                        <p className="text-lg font-bold capitalize">{customer.poutcome}</p>
                        <p className="text-xs text-muted-foreground">Previous outcome</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">{customer.previous}</span>
                    <p className="text-xs text-muted-foreground">Prior Contacts</p>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 shadow-sm bg-slate-50 dark:bg-zinc-900/50 rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500" />
              Last Interaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customer.duration}s</div>
            <p className="text-xs text-muted-foreground mt-1">
              Call duration
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
        
        <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
          <Card className="border-slate-200 dark:border-zinc-800 shadow-sm rounded-xl overflow-hidden h-full">
            <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <User className="h-4 w-4" /> Customer Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                <ProfileRow 
                    icon={<User className="h-4 w-4 text-slate-500" />}
                    label="Age"
                    value={`${customer.age} Years old`}
                />
                <ProfileRow 
                    icon={<Briefcase className="h-4 w-4 text-slate-500" />}
                    label="Job"
                    value={jobLabel}
                    isBadge
                />
                <ProfileRow 
                    icon={<Heart className="h-4 w-4 text-slate-500" />}
                    label="Marital Status"
                    value={maritalLabel}
                    isBadge
                />
                <ProfileRow 
                    icon={<GraduationCap className="h-4 w-4 text-slate-500" />}
                    label="Education"
                    value={educationLabel}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col gap-6">
            
            <Card className="shadow-sm rounded-xl border-slate-200 dark:border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-500" /> 
                        Economic Indicators
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <IndicatorBox label="Emp. Var. Rate" value={customer.emp_var_rate} />
                        <IndicatorBox label="CPI" value={customer.cons_price_idx} />
                        <IndicatorBox label="Conf. Index" value={customer.cons_conf_idx} />
                        <IndicatorBox label="Euribor 3m" value={customer.euribor3m} />
                        <IndicatorBox label="Nr. Employed" value={customer.nr_employed} />
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm rounded-xl border-slate-200 dark:border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-500" /> 
                        Last Campaign Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                         <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-medium uppercase">Contact Method</p>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="capitalize">{customer.contact}</Badge>
                            </div>
                         </div>
                         <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-medium uppercase">Timing</p>
                            <p className="font-medium capitalize">{customer.day_of_week}, in {customer.month}</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-medium uppercase">Campaign Contacts</p>
                            <p className="font-medium">{customer.campaign} contacts made</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-medium uppercase">Days Passed</p>
                            <p className="font-medium">
                                {customer.pdays === 999 ? "Never contacted before" : `${customer.pdays} days ago`}
                            </p>
                         </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

function ProfileRow({ icon, label, value, isBadge }: { icon: React.ReactNode, label: string, value: string, isBadge?: boolean }) {
    return (
        <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
            </div>
            {isBadge ? (
                <Badge variant="outline" className="capitalize font-normal bg-white dark:bg-zinc-900">
                    {value}
                </Badge>
            ) : (
                <span className="text-sm font-medium">{value}</span>
            )}
        </div>
    )
}

function StatusBadge({ label, value }: { label: string, value: string }) {
    const isYes = value === 'yes';
    const isNo = value === 'no';
    
    return (
        <div className={`flex flex-col items-center justify-center p-2 rounded-lg border ${
            isYes ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 
            isNo ? 'bg-slate-50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-800' : 
            'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
        }`}>
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1">{label}</span>
            <span className={`font-bold text-sm capitalize ${
                isYes ? 'text-green-700 dark:text-green-400' : 
                isNo ? 'text-slate-700 dark:text-slate-400' : 
                'text-amber-700 dark:text-amber-400'
            }`}>{value}</span>
        </div>
    )
}

function IndicatorBox({ label, value }: { label: string, value: number }) {
    return (
        <div className="p-3 bg-slate-50 dark:bg-zinc-900/50 rounded-lg border border-slate-100 dark:border-zinc-800">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">{label}</p>
            <p className="text-lg font-mono font-medium">{value}</p>
        </div>
    )
}

function CustomerDetailSkeleton() {
  return (
    <div className="space-y-6 w-full max-w-[100vw] overflow-x-hidden">
      <div className="flex justify-between items-center">
         <div className="flex gap-4">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
            </div>
         </div>
         <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      
      <div className="grid grid-cols-12 gap-4">
         <Skeleton className="col-span-4 h-32 rounded-xl" />
         <Skeleton className="col-span-5 h-32 rounded-xl" />
         <Skeleton className="col-span-3 h-32 rounded-xl" />
      </div>

      <div className="grid grid-cols-12 gap-6">
         <Skeleton className="col-span-4 h-96 rounded-xl" />
         <div className="col-span-8 flex flex-col gap-6">
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
         </div>
      </div>
    </div>
  );
}