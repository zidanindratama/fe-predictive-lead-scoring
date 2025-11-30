"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerFormCreate } from "@/components/dashboard/customers/customer-form-create";

export default function CreateCustomerPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="rounded-xl border-slate-200 dark:border-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Customer</h1>
          <p className="text-sm text-muted-foreground">
            Add a new banking customer manually.
          </p>
        </div>
      </div>

      <CustomerFormCreate />
    </div>
  );
}