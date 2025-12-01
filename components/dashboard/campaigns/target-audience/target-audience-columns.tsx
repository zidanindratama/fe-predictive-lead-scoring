"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TargetAudienceAction } from "./target-audience-action";
import { DataTableColumnHeader } from "../../(global)/datatable/data-table-column-header";
import { JOB_OPTIONS } from "../_data/const";
import { cn } from "@/lib/utils";

export type CampaignTarget = {
  id: string;
  predictedClass: "YES" | "NO";
  probabilityYes: number;
  customer: {
    id: string;
    name: string;
    age: number;
    job: string;
    marital: string;
    education: string;
    housing: string;
    loan: string;
    contact: string;
  };
};

export const targetAudienceColumns: ColumnDef<CampaignTarget>[] = [
  {
    accessorKey: "customer.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.customer.name}</span>
        <span className="text-[10px] text-muted-foreground font-mono">
          {row.original.customer.id.substring(0, 8)}...
        </span>
      </div>
    ),
  },
  {
    accessorKey: "customer.age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => <span>{row.original.customer.age}</span>,
  },
  {
    accessorKey: "customer.job",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize font-normal">
        {JOB_OPTIONS.find((item) => item.value === row.original.customer.job)
          ?.label || row.original.customer.job}
      </Badge>
    ),
  },
  {
    accessorKey: "predictedClass",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prediction" />
    ),
    cell: ({ row }) => {
      const isYes = row.getValue("predictedClass") === "YES";
      return (
        <Badge
          variant={isYes ? "default" : "secondary"}
          className={cn(
            "font-semibold w-14 justify-center",
            isYes
              ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200"
          )}
        >
          {row.getValue("predictedClass")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "probabilityYes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Confidence" />
    ),
    cell: ({ row }) => {
      const prob = row.original.probabilityYes * 100;
      const isHigh = prob > 70;
      return (
        <div className="w-[100px] space-y-1">
          <div className="flex justify-between text-xs">
            <span
              className={cn(
                "font-medium",
                isHigh ? "text-green-600" : "text-muted-foreground"
              )}
            >
              {prob.toFixed(1)}%
            </span>
          </div>
          <Progress
            value={prob}
            className={cn(
              "h-1.5",
              isHigh
                ? "*:data-[slot=progress-indicator]:bg-green-500"
                : "*:data-[slot=progress-indicator]:bg-slate-300"
            )}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TargetAudienceAction data={row.original.customer} />,
  },
];
