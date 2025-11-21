"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CampaignFormCreate } from "@/components/dashboard/campaigns/campaign-form-create";

export default function DashboardCampaignCreatePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-6 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            Create Campaign
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Set up a new prediction campaign.
          </p>
        </div>
      </div>

      <CampaignFormCreate />
    </div>
  );
}
