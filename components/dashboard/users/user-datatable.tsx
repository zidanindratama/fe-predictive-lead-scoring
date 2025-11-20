"use client";

import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useGetData } from "@/hooks/use-get-data";
import { DataTable } from "../(global)/datatable/data-table";
import { User, userColumns } from "./user-columns";

export default function UserDatatable() {
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

  const { data, isLoading } = useGetData<{ items: User[]; meta: any }>(
    ["users", queryParams as any],
    "/users",
    queryParams
  );

  return (
    <div className="flex flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Users Management
          </h2>
          <p className="text-muted-foreground">
            Manage your system users, roles, and access permissions.
          </p>
        </div>
      </div>

      <DataTable
        columns={userColumns}
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
    </div>
  );
}
