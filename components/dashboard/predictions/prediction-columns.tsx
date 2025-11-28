"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DataTableColumnHeader } from "../(global)/datatable/data-table-column-header";
import { cn } from "@/lib/utils";
import { PredictionCellAction } from "./prediction-cell-action";

export type Prediction = {
  id: string;
  predictedClass: "YES" | "NO";
  probabilityYes: number;
  probabilityNo: number;
  timestamp: string;
  source: string;
  customer: {
    id: string;
    name: string;
    job: string;
  };
};

export const predictionColumns: ColumnDef<Prediction>[] = [
  {
    accessorKey: "customer.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.customer.name}</span>
        <span className="text-xs text-muted-foreground capitalize">
          {row.original.customer.job}
        </span>
      </div>
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
          className={
            isYes
              ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
              : "bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200"
          }
        >
          {row.getValue("predictedClass")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "probabilityYes",
    header: "Confidence (YES)",
    cell: ({ row }) => {
      const prob = row.original.probabilityYes * 100;
      return (
        <div className="w-[120px] space-y-1">
          <div className="flex justify-between text-xs">
            <span>{prob.toFixed(1)}%</span>
          </div>
          <Progress
            value={prob}
            className={cn(
              "h-2",
              prob > 50
                ? "*:data-[slot=progress-indicator]:bg-green-500"
                : "*:data-[slot=progress-indicator]:bg-slate-300"
            )}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("timestamp")), "MMM dd, HH:mm")}
      </span>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-mono text-[10px]">
        {row.getValue("source")}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <PredictionCellAction data={row.original} />,
  },
];
