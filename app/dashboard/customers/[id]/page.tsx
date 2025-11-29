"use client";

import { useParams } from "next/navigation";
import { CustomerDetail } from "@/components/dashboard/customers/customer-detail";

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return <CustomerDetail id={id} />;
}