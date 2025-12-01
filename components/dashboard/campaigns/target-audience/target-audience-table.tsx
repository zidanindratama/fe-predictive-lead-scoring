"use client";

import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { Users, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetData } from "@/hooks/use-get-data";
import {
  CampaignTarget,
  targetAudienceColumns,
} from "./target-audience-columns";
import { DataTable } from "../../(global)/datatable/data-table";
import { DataTableToolbar } from "../../(global)/datatable/data-table-toolbar";

interface TargetAudienceTableProps {
  campaignId: string;
}

export function TargetAudienceTable({ campaignId }: TargetAudienceTableProps) {
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

  const { data, isLoading } = useGetData<{
    items: CampaignTarget[];
    meta: any;
  }>(
    ["campaign-targets", campaignId, queryParams as any],
    `/campaigns/${campaignId}/targets`,
    queryParams
  );

  const resetFilters = () => {
    setSearch("");
    setPredictedClassFilter(undefined);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const totalItems = data?.meta?.total || 0;

  return (
    <Card className="border-slate-200 dark:border-zinc-800 shadow-none h-full flex flex-col">
      <CardHeader className="pb-2 border-b bg-slate-50/50 dark:bg-zinc-900/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            Target Audience Results
            <span className="ml-2 text-sm font-normal text-muted-foreground bg-white dark:bg-zinc-800 px-2 py-0.5 rounded-full border shadow-sm">
              {totalItems} targets
            </span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4 flex-1">
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
              title: "Prediction",
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
          columns={targetAudienceColumns}
          data={data?.items ?? []}
          pageCount={data?.meta?.pages ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
