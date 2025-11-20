"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Shield, ShieldAlert, User as UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "../(global)/datatable/data-table-column-header";
import { UserCellAction } from "./user-cell-action";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF" | "USER";
  avatarUrl?: string;
  createdAt: string;
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Info" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      const initials = user.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()
        : "U";

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string;

      const getRoleBadge = (r: string) => {
        switch (r) {
          case "ADMIN":
            return (
              <Badge variant="destructive" className="gap-1">
                <ShieldAlert className="h-3 w-3" /> Admin
              </Badge>
            );
          case "STAFF":
            return (
              <Badge
                variant="default"
                className="bg-blue-500 hover:bg-blue-600 gap-1"
              >
                <Shield className="h-3 w-3" /> Staff
              </Badge>
            );
          default:
            return (
              <Badge variant="secondary" className="gap-1">
                <UserIcon className="h-3 w-3" /> User
              </Badge>
            );
        }
      };

      return getRoleBadge(role);
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
    cell: ({ row }) => <UserCellAction data={row.original} />,
  },
];
