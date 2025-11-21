"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Target, CheckCircle2, XCircle, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "../(global)/datatable/data-table-column-header";
import { CampaignCellAction } from "./campaign-cell-action";

export type Campaign = {
  id: string;
  name: string;
  criteria: any;
  totalTargets: number;
  yesCount: number;
  noCount: number;
  createdAt: string;
};

export const campaignColumns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campaign Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalTargets",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Targets" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="font-mono">
          {row.getValue("totalTargets")}
        </Badge>
      </div>
    ),
  },
  {
    id: "stats",
    header: "Performance",
    cell: ({ row }) => {
      const yes = row.original.yesCount;
      const no = row.original.noCount;
      const total = row.original.totalTargets;
      const rate = total > 0 ? ((yes / total) * 100).toFixed(1) : "0.0";

      return (
        <div className="flex flex-col gap-1 min-w-[120px]">
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center text-green-600 gap-1">
              <CheckCircle2 className="h-3 w-3" /> {yes}
            </span>
            <span className="flex items-center text-slate-400 gap-1">
              <XCircle className="h-3 w-3" /> {no}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Conv. Rate: {rate}%
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return (
        <span className="text-sm text-muted-foreground">
          {format(new Date(row.getValue("createdAt")), "dd MMM yyyy, HH:mm")}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CampaignCellAction data={row.original} />,
  },
];
