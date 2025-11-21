"use client";

import { useState, useMemo } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetData } from "@/hooks/use-get-data";
import { Customer, targetAudienceColumns } from "./target-audience-columns";
import { DataTable } from "../../(global)/datatable/data-table";

interface TargetAudienceTableProps {
  criteria: any;
}

export function TargetAudienceTable({ criteria }: TargetAudienceTableProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");

  const filters = useMemo(() => {
    const params: any = {};

    if (!criteria) return params;

    if (criteria.age?.gte) params.ageMin = criteria.age.gte;
    if (criteria.age?.lte) params.ageMax = criteria.age.lte;

    if (criteria.job?.in && criteria.job.in.length > 0) {
      params.job = criteria.job.in[0];
    }

    if (criteria.marital?.in && criteria.marital.in.length > 0) {
      params.marital = criteria.marital.in[0];
    }

    if (criteria.education?.in && criteria.education.in.length > 0) {
      params.education = criteria.education.in[0];
    }

    if (criteria.contact) params.contact = criteria.contact;

    return params;
  }, [criteria]);

  const queryParams = {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    q: search,
    sortBy: sorting[0]?.id,
    sortDir: sorting[0]?.desc ? "desc" : "asc",
    ...filters,
  };

  const { data, isLoading } = useGetData<{ items: Customer[]; meta: any }>(
    ["customers", queryParams as any],
    "/customers",
    queryParams
  );

  return (
    <Card className="border-slate-200 dark:border-zinc-800 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-600" />
          Target Audience Preview
          {data?.meta?.totalItems !== undefined && (
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              {data.meta.totalItems} matching customers
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={targetAudienceColumns}
          data={data?.items ?? []}
          pageCount={data?.meta?.pages ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          searchKey="name"
          searchValue={search}
          onSearchValueChange={setSearch}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
