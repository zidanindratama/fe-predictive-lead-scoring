"use client";

import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";

import { useGetData } from "@/hooks/use-get-data";
import { DataTable } from "../(global)/datatable/data-table";
import { Campaign, campaignColumns } from "./campaign-columns";
import { Button } from "@/components/ui/button";
import { DataTableToolbar } from "../(global)/datatable/data-table-toolbar";

export default function CampaignDatatable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const [search, setSearch] = useState("");

  const queryParams = {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    q: search,
    sortBy: sorting[0]?.id,
    sortDir: sorting[0]?.desc ? "desc" : "asc",
  };

  const { data, isLoading } = useGetData<{ items: Campaign[]; meta: any }>(
    ["campaigns", queryParams as any],
    "/campaigns",
    queryParams
  );

  const resetFilters = () => {
    setSearch("");
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Campaigns</h2>
          <p className="text-muted-foreground">
            Manage marketing campaigns and view prediction results.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/campaigns/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
      </div>

      <DataTableToolbar
        searchKey="campaign name"
        searchValue={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
        filters={[]}
        onReset={resetFilters}
      />

      <DataTable
        columns={campaignColumns}
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
