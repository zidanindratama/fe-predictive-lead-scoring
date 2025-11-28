import { Suspense } from "react";
import PredictionDatatable from "@/components/dashboard/predictions/prediction-datatable";

export default function PredictionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PredictionDatatable />
    </Suspense>
  );
}
