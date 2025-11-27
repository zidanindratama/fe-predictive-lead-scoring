"use client";

import { useCallback, useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useGetData } from "@/hooks/use-get-data";
import { DataTable } from "../(global)/datatable/data-table";
import { Prediction, predictionColumns } from "./prediction-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  PredictionsFilters,
  PredictionFilters,
} from "./predictions-filters";

interface AuthUser {
  role?: string;
}

export default function PredictionDatatable() {
  const { data: user } = useGetData<AuthUser>(["me"], "/auth/me");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState<Partial<PredictionFilters>>({});
  const [search, setSearch] = useState("");

  const sortingMap: Record<string, string> = {
    timestamp: "timestamp",
    prediction: "predictedClass",   
    probability: "probabilityYes",  
  };

  const sortKey = sortingMap[sorting[0]?.id ?? ""];

  const queryParams = {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    q: search,
    predictedClass: filters.predictedClass,
    probYesMin: filters.probYesMin,
    probYesMax: filters.probYesMax,
    source: filters.source,
    from: filters.dateFrom,
    to: filters.dateTo,

    sortBy: sortKey || undefined,
    sortDir: sortKey ? (sorting[0]?.desc ? "desc" : "asc") : undefined,
  };

  interface PredictionResponse {
    items: Prediction[];
    meta: {
      pages?: number;
      total?: number;
      page?: number;
      limit?: number;
    };
  }

  const { data, isLoading } = useGetData<PredictionResponse>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ["predictions", queryParams] as any,
    "/predictions",
    queryParams
  );

  const handleFiltersChange = useCallback((newFilters: PredictionFilters) => {
    setFilters(newFilters);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4 space-y-2">
        <div className="flex flex-col space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Lead Scoring Results</h2>
            <p className="text-muted-foreground">AI-driven insights and probability scores.</p>
          </div>
        </div>

        {user?.role !== "USER" && (
          <Button asChild>
            <Link href="/dashboard/predictions/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Prediction
            </Link>
          </Button>  
        )}
      </div>

      <PredictionsFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isLoading={isLoading}
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
        searchKey="name"
        searchValue={search}
        onSearchValueChange={setSearch}
      />

      
    </div>
  );
}
