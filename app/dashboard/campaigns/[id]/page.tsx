"use client";

import { useParams } from "next/navigation";
import { CampaignDetail } from "@/components/dashboard/campaigns/campaign-detail";

export default function CampaignDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return <CampaignDetail id={id} />;
}
