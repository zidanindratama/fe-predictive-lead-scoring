"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserFormUpdate } from "@/components/dashboard/users/user-form-update";

export default function DashboardUserUpdatePage() {
  const params = useParams();
  const router = useRouter();

  const userId = params.id as string;

  return (
    <div className="flex flex-col space-y-6 p-8 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-9 w-9 rounded-xl border-slate-200 dark:border-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Edit User
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Update user details and permissions.
          </p>
        </div>
      </div>

      <UserFormUpdate userId={userId} />
    </div>
  );
}
