import CampaignDatatable from "@/components/dashboard/campaigns/campaign-datatable";
import { Suspense } from "react";

export default function DashboardCampaignsPage() {
  return (
    <>
      <Suspense>
        <CampaignDatatable />
      </Suspense>
    </>
  );
}
