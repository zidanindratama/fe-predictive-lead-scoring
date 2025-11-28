"use client";

import { useParams } from "next/navigation";
import { PredictionDetail } from "@/components/dashboard/predictions/prediction-detail";

export default function PredictionDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return <PredictionDetail id={id} />;
}
