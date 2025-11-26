"use client";

import { useState, useMemo } from "react";
import { MoreHorizontal, Eye, Trash } from "lucide-react";
import { toast } from "sonner";
// removed unused Link import
import { useQueryClient } from "@tanstack/react-query";

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
import { Prediction } from "./prediction-columns";
import { getPredictionPermissions, UserRole } from "./prediction-auth";
import { PredictionDetailSheet } from "./prediction-detail-sheet";

interface AuthUser {
  role?: string;
}

interface PredictionCellActionProps {
  data: Prediction;
}

export const PredictionCellAction = ({ data }: PredictionCellActionProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const { data: user } = useGetData<AuthUser>(["me"], "/auth/me");
  
  const permissions = useMemo(
    () => getPredictionPermissions((user?.role as UserRole) || undefined),
    [user?.role]
  );

  const queryClient = useQueryClient();

  const { mutate: deletePrediction, isPending: isDeleting } = useDeleteData(
    "/predictions",
    [["predictions"]],
    {
      onSuccess: () => {
          toast.success("Prediction deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["predictions"] });

          setDeleteOpen(false);
        },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete prediction"
        );
      },
    }
  );

  const onConfirmDelete = () => {
    deletePrediction(data.id);
  };

  return (
    <>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              prediction record for
              <span className="font-bold text-foreground"> {data.customer.name}</span>.
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
              className="bg-red-600 focus:ring-red-600 hover:bg-red-700"
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
            <MoreHorizontal className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => setDetailOpen(true)}
            className="flex items-center font-medium text-blue-600 focus:text-blue-700 dark:text-blue-400 dark:focus:text-blue-300 cursor-pointer"
          >
            <Eye className="mr-2 h-4 w-4 text-blue-600" />
            View
          </DropdownMenuItem>

          {permissions.canDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setDeleteOpen(true)}
                className="flex items-center font-medium text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950/50 cursor-pointer"
              >
                <Trash className="mr-2 h-4 w-4 text-red-600" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <PredictionDetailSheet
        id={data.id}
        isOpen={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
};
