"use client";

import { useState } from "react";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteData } from "@/hooks/use-delete-data";
import { useGetData } from "@/hooks/use-get-data";
import { Customer } from "./_schema/schema";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AuthUser {
  role?: string;
}

export const CustomerCellAction = ({ data }: { data: Customer }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { data: user } = useGetData<AuthUser>(["me"], "/auth/me");

  const queryClient = useQueryClient();

  const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteData(
    "/customers",
    [["customers"]],
    {
      onSuccess: () => {
        toast.success("Customer deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        setDeleteOpen(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete customer"
        );
      },
    }
  );

  const onConfirmDelete = () => {
    deleteCustomer(data.id);
  };

  return (
    <>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-bold text-foreground">{data.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(e) => {
                e.preventDefault();
                onConfirmDelete();
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/customers/${data.id}`}
              className="flex items-center font-medium text-blue-600 focus:text-blue-700 dark:text-blue-500 dark:focus:text-blue-400 cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4 text-blue-600" />
              View Customer
            </Link>
          </DropdownMenuItem>

          {user?.role !== "USER" && (
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/customers/${data.id}/update`}
                className="flex items-center font-medium text-amber-600 focus:text-amber-700 dark:text-amber-500 dark:focus:text-amber-400 cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4 text-amber-600" />
                Edit Customer
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          {user?.role === "ADMIN" && (
            <DropdownMenuItem
              onClick={() => setDeleteOpen(true)}
              className="flex items-center font-medium text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950/50 cursor-pointer"
            >
              <Trash className="mr-2 h-4 w-4 text-red-600" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
