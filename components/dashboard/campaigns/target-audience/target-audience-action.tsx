"use client";

import { useState } from "react";
import {
  Eye,
  Briefcase,
  GraduationCap,
  Home,
  CreditCard,
  User,
  Heart,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  EDUCATION_OPTIONS,
  JOB_OPTIONS,
  MARITAL_OPTIONS,
} from "../_data/const";

interface Customer {
  id: string;
  name: string;
  job: string;
  age: number;
  marital: string;
  education: string;
  housing: string;
  loan: string;
  contact: string;
}

interface TargetAudienceActionProps {
  data: Customer;
}

export const TargetAudienceAction = ({ data }: TargetAudienceActionProps) => {
  const [open, setOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
        onClick={() => setOpen(true)}
      >
        <Eye className="h-4 w-4" />
        <span className="sr-only">View Details</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden border border-slate-200 shadow-xl sm:rounded-xl bg-white dark:bg-zinc-950 dark:border-zinc-800">
          <DialogHeader className="mt-8 p-6 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {/* 1. Avatar dengan aksen Biru */}
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm ring-1 ring-slate-100 rounded-xl">
                  <AvatarFallback className="bg-blue-50 text-blue-600 font-bold rounded-xl text-lg">
                    {getInitials(data.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    {data.name}
                  </DialogTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                    <span className="capitalize">
                      {JOB_OPTIONS.find((item) => item.value === data.job)
                        ?.label || data.job}
                    </span>
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className="font-mono text-[10px] text-slate-400 bg-slate-50"
              >
                #{data.id.substring(0, 6)}
              </Badge>
            </div>
          </DialogHeader>

          <div className="mb-8 p-6 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <DetailBox
                label="Age"
                value={`${data.age}`}
                icon={<User className="h-3.5 w-3.5 text-blue-500" />}
              />
              <DetailBox
                label="Education"
                value={
                  EDUCATION_OPTIONS.find(
                    (item) => item.value === data.education
                  )?.label || data.education
                }
                icon={<GraduationCap className="h-3.5 w-3.5 text-violet-500" />}
              />
              <DetailBox
                label="Status"
                value={
                  MARITAL_OPTIONS.find((item) => item.value === data.marital)
                    ?.label || data.marital
                }
                icon={<Heart className="h-3.5 w-3.5 text-rose-500" />}
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Financial Indicators
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <StatusItem
                  label="Housing Loan"
                  hasLoan={data.housing === "yes"}
                  icon={<Home className="h-4 w-4" />}
                />
                <StatusItem
                  label="Personal Loan"
                  hasLoan={data.loan === "yes"}
                  icon={<CreditCard className="h-4 w-4" />}
                />
              </div>
            </div>

            <Card className="bg-slate-50 dark:bg-zinc-900 border-dashed border-slate-200 dark:border-zinc-800 shadow-none p-3 flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-zinc-950 border rounded-md text-indigo-600 shadow-sm">
                <Smartphone className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-center">
                <span className="text-xs font-medium text-slate-500 uppercase">
                  Contact Preference
                </span>
                <span className="text-sm font-semibold capitalize text-slate-800 dark:text-slate-200">
                  {data.contact}
                </span>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const DetailBox = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="space-y-1.5 group cursor-default">
    <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-slate-900 transition-colors">
      {icon}
      <span className="text-[11px] uppercase font-medium">{label}</span>
    </div>
    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 capitalize truncate">
      {value}
    </p>
  </div>
);

const StatusItem = ({
  label,
  hasLoan,
  icon,
}: {
  label: string;
  hasLoan: boolean;
  icon: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border transition-colors",
        hasLoan
          ? "bg-red-50/50 border-red-100 dark:bg-red-900/10 dark:border-red-900/20"
          : "bg-emerald-50/50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/20"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(hasLoan ? "text-red-600" : "text-emerald-600")}>
          {icon}
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
      </div>
      {hasLoan ? (
        <Badge
          variant="outline"
          className="h-5 px-1.5 text-[10px] bg-white text-red-700 border-red-200 uppercase font-bold tracking-wide"
        >
          Active
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="h-5 px-1.5 text-[10px] bg-white text-emerald-700 border-emerald-200 uppercase font-bold tracking-wide"
        >
          None
        </Badge>
      )}
    </div>
  );
};
