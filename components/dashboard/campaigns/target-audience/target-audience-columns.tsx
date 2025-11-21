"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TargetAudienceAction } from "./target-audience-action";
import { DataTableColumnHeader } from "../../(global)/datatable/data-table-column-header";
import { JOB_OPTIONS } from "../_data/const";

export type Customer = {
  id: string;
  name: string;
  age: number;
  job: string;
  marital: string;
  education: string;
  housing: string;
  loan: string;
  contact: string;
  createdAt: string;
};

export const targetAudienceColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
  },
  {
    accessorKey: "job",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize font-normal">
        {JOB_OPTIONS.find((item) => item.value === row.getValue("job"))
          ?.label || row.getValue("job")}
      </Badge>
    ),
  },
  {
    accessorKey: "marital",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marital" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("marital")}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <TargetAudienceAction data={row.original} />,
  },
];
