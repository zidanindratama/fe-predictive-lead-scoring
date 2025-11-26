"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { User, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "../(global)/datatable/data-table-column-header";
import { PredictionCellAction } from "./prediction-cell-action";

export type Prediction = {
  id: string;
  timestamp: string;
  customer: { name: string; job?: string };
  predictedClass: "YES" | "NO";
  probabilityYes: number;
  probabilityNo: number;
  source: string;
};

export const predictionColumns: ColumnDef<Prediction>[] = [
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timestamp" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("timestamp")), "dd MMM yyyy, HH:mm")}
      </span>
    ),
  },
  {
    accessorKey: "customer",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      const customer = row.getValue("customer") as Prediction["customer"];
      return (
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-50 dark:bg-zinc-900/20 rounded-lg">
            <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{customer.name}</span>
            {customer.job && (
              <span className="text-xs text-muted-foreground">{customer.job}</span>
            )}
          </div>
        </div>
      );
    },
    sortingFn: (a, b) => {
      const customerA = (a.getValue("customer") as Prediction["customer"]).name;
      const customerB = (b.getValue("customer") as Prediction["customer"]).name;
      return customerA.localeCompare(customerB);
    },
  },
  {
    id: "prediction",
    header: "Prediction",
    cell: ({ row }) => (
      <Badge variant={row.original.predictedClass === "YES" ? "success" : "destructive"}>
        {row.original.predictedClass}
      </Badge>
    ),
  },
  {
    accessorKey: "probabilityYes",
    id: "probability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Confidence" />
    ),
    cell: ({ row }) => {
      const p = Math.round((row.original.probabilityYes ?? 0) * 100);
      return (
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{p}%</span>
        </div>
      );
    },
    sortingFn: (a, b) => {
      const probA = a.original.probabilityYes ?? 0;
      const probB = b.original.probabilityYes ?? 0;
      return probA - probB;
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const src = row.getValue("source") as string;
      if (src && src.startsWith("campaign:")) {
        const id = src.replace("campaign:", "");
        return (
          <a className="text-blue-600 dark:text-blue-400 hover:underline text-sm" href={`/dashboard/campaigns/${id}`}>
            Campaign: {id.substring(0, 8)}...
          </a>
        );
      }
      return <Badge variant="secondary" className="text-xs">{src === "manual" ? "Manual" : src}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <PredictionCellAction data={row.original} />,
  },
];
