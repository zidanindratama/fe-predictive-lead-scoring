"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerImportForm } from "@/components/dashboard/customers/customer-import-form";

export default function ImportCustomerPage() {
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
          <h1 className="text-2xl font-bold tracking-tight">Import Customers</h1>
          <p className="text-sm text-muted-foreground">
            Bulk upload customer data from external files.
          </p>
        </div>
      </div>

      <CustomerImportForm />
    </div>
  );
}