"use client"

import { PredictionDetailPage } from "@/components/dashboard/predictions/prediction-detail-page";
import { useParams } from "next/navigation";

export default function PredictionDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  return <PredictionDetailPage id={id} />
}
