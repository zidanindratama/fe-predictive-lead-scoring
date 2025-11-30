"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../(global)/datatable/data-table-column-header"; 
import { CustomerCellAction } from "./customer-cell-action";
import { Customer } from "./_schema/schema";
import { JOB_OPTIONS, MARITAL_OPTIONS, EDUCATION_OPTIONS } from "./_data/const";
import { Badge } from "@/components/ui/badge";

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "job",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job" />
    ),
    cell: ({ row }) => {
      const jobValue = row.getValue("job") as string;
      const jobLabel = JOB_OPTIONS.find((opt) => opt.value === jobValue)?.label || jobValue;
      
      return (
        <Badge variant="outline" className="capitalize">
          {jobLabel}
        </Badge>
      );
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
  },
  
  {
    accessorKey: "marital",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marital" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("marital") as string;
      const label = MARITAL_OPTIONS.find((opt) => opt.value === value)?.label || value;
      return <span className="capitalize">{label}</span>;
    },
  },
  {
    accessorKey: "education",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Education" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("education") as string;
      const label = EDUCATION_OPTIONS.find((opt) => opt.value === value)?.label || value;
      return (
        <span className="capitalize text-muted-foreground text-sm">
          {label}
        </span>
      );
    },
  },
  {
    accessorKey: "housing",
    header: "Housing",
    cell: ({ row }) => {
      const value = row.original.housing as string;
      return (
        <Badge variant={value === 'yes' ? 'success' : 'destructive'} className="capitalize font-normal">
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "loan",
    header: "Loan",
    cell: ({ row }) => {
      const value = row.original.loan as string;
      return (
        <Badge variant={value === 'yes' ? 'success' : 'destructive'} className="capitalize font-normal">
          {value}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CustomerCellAction data={row.original} />,
  },
];