"use client";

import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { Plus, BrainCircuit, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

import { useGetData } from "@/hooks/use-get-data";
import { DataTable } from "../(global)/datatable/data-table";
import { Prediction, predictionColumns } from "./prediction-columns";
import { Button } from "@/components/ui/button";
import { DataTableToolbar } from "../(global)/datatable/data-table-toolbar";

export default function PredictionDatatable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const [search, setSearch] = useState("");
  const [predictedClassFilter, setPredictedClassFilter] = useState<
    string | undefined
  >(undefined);

  const queryParams = {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    q: search,
    predictedClass: predictedClassFilter,
    sortBy: sorting[0]?.id,
    sortDir: sorting[0]?.desc ? "desc" : "asc",
  };

  const { data, isLoading } = useGetData<{ items: Prediction[]; meta: any }>(
    ["predictions", queryParams as any],
    "/predictions",
    queryParams
  );

  const resetFilters = () => {
    setSearch("");
    setPredictedClassFilter(undefined);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            Predictions
          </h2>
          <p className="text-muted-foreground">
            History of AI predictions for customer conversion.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/predictions/create">
            <Plus className="mr-2 h-4 w-4" />
            New Prediction
          </Link>
        </Button>
      </div>

      <DataTableToolbar
        searchKey="customer name"
        searchValue={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
        filters={[
          {
            key: "predictedClass",
            title: "Prediction Class",
            options: [
              { label: "YES (Conversion)", value: "YES", icon: CheckCircle2 },
              { label: "NO (No Conversion)", value: "NO", icon: XCircle },
            ],
          },
        ]}
        filterValues={{
          predictedClass: predictedClassFilter,
        }}
        onFilterChange={(key, val) => {
          if (key === "predictedClass") {
            const singleVal = Array.isArray(val) ? val[0] : val;
            setPredictedClassFilter(singleVal as string | undefined);
          }
          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
        onReset={resetFilters}
      />

      <DataTable
        columns={predictionColumns}
        data={data?.items ?? []}
        pageCount={data?.meta?.pages ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        isLoading={isLoading}
      />
    </div>
  );
}
