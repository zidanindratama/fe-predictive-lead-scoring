"use client";

import { useState } from "react";
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
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
import { Campaign } from "./campaign-columns";

interface CampaignCellActionProps {
  data: Campaign;
}

export const CampaignCellAction = ({ data }: CampaignCellActionProps) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteCampaign, isPending: isDeleting } = useDeleteData(
    "/campaigns",
    [["campaigns"]],
    {
      onSuccess: () => {
        toast.success("Campaign deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["campaigns"] });

        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete campaign"
        );
      },
    }
  );

  const onConfirmDelete = () => {
    deleteCampaign(data.id);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              campaign{" "}
              <span className="font-bold text-foreground">{data.name}</span> and
              remove all associated predictions.
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

          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/campaigns/${data.id}`}
              className="flex items-center font-medium text-blue-600 focus:text-blue-700 dark:text-blue-400 dark:focus:text-blue-300 cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4 text-blue-600" />
              View & Run
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/campaigns/${data.id}/update`}
              className="flex items-center font-medium text-amber-600 focus:text-amber-700 dark:text-amber-500 dark:focus:text-amber-400 cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4 text-amber-600" />
              Edit Criteria
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="flex items-center font-medium text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950/50 cursor-pointer"
          >
            <Trash className="mr-2 h-4 w-4 text-red-600" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
