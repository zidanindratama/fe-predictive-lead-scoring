"use client";

import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import {
  Plus,
  Download,
  Briefcase,
  Heart,
  Upload,
  Calendar,
  GraduationCap,
  Hash,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTimePicker } from "@/components/ui/date-time-picker";

import { useGetData } from "@/hooks/use-get-data";
import { useExportData } from "@/hooks/use-export-data";
import { useDebounce } from "@/hooks/use-debounce";
import { DataTable } from "../(global)/datatable/data-table";
import { DataTableToolbar } from "../(global)/datatable/data-table-toolbar";

import { customerColumns } from "./customer-columns";
import { Customer } from "./_schema/schema";
import { JOB_OPTIONS, MARITAL_OPTIONS, EDUCATION_OPTIONS } from "./_data/const";

interface AuthUser {
  role?: string;
}

const jobFilterOptions = JOB_OPTIONS.map((opt) => ({
  label: opt.label,
  value: opt.value,
  icon: Briefcase,
}));

const maritalFilterOptions = MARITAL_OPTIONS.map((opt) => ({
  label: opt.label,
  value: opt.value,
  icon: Heart,
}));

const educationFilterOptions = EDUCATION_OPTIONS.map((opt) => ({
  label: opt.label,
  value: opt.value,
  icon: GraduationCap,
}));

export default function CustomerDatatable() {
  const { data: user } = useGetData<AuthUser>(["me"], "/auth/me");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [jobFilter, setJobFilter] = useState<string | undefined>(undefined);
  const [maritalFilter, setMaritalFilter] = useState<string | undefined>(
    undefined
  );
  const [educationFilter, setEducationFilter] = useState<string | undefined>(
    undefined
  );

  const [ageMin, setAgeMin] = useState<number | undefined>(undefined);
  const [ageMax, setAgeMax] = useState<number | undefined>(undefined);

  const [dateFrom, setDateFrom] = useState<string | undefined>(undefined);
  const [dateTo, setDateTo] = useState<string | undefined>(undefined);

  const sortKey = sorting[0]?.id;

  const queryParams = {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    q: debouncedSearch,
    job: jobFilter,
    marital: maritalFilter,
    education: educationFilter,
    ageMin: ageMin,
    ageMax: ageMax,
    from: dateFrom ? format(new Date(dateFrom), "yyyy-MM-dd") : undefined,
    to: dateTo ? format(new Date(dateTo), "yyyy-MM-dd") : undefined,
    sortBy: sortKey || "createdAt",
    sortDir: sorting[0]?.desc ? "desc" : "asc",
  };

  interface CustomerResponse {
    items: Customer[];
    meta: {
      pages?: number;
      total?: number;
    };
  }

  const { data, isLoading } = useGetData<CustomerResponse>(
    ["customers", queryParams] as any,
    "/customers",
    queryParams
  );

  const { mutate: exportData, isPending: isExporting } = useExportData();

  const handleExport = (type: "csv" | "xlsx") => {
    exportData({
      url: `/customers/export.${type}`,
      format: type,
    });
  };

  const resetFilters = () => {
    setSearch("");
    setJobFilter(undefined);
    setMaritalFilter(undefined);
    setEducationFilter(undefined);
    setAgeMin(undefined);
    setAgeMax(undefined);
    setDateFrom(undefined);
    setDateTo(undefined);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const isAgeFiltered = ageMin !== undefined || ageMax !== undefined;

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between gap-4 space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your banking customers and lead data.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {user?.role !== "USER" && (
            <>
              <div className="flex md:items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" disabled={isExporting}>
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleExport("csv")}>
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport("xlsx")}>
                      Export as XLSX
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button asChild variant="outline">
                  <Link href="/dashboard/customers/import">
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </Link>
                </Button>
              </div>

              <Button className="w-fit" asChild>
                <Link href="/dashboard/customers/create">
                  <Plus className="mr-2 h-4 w-4" />
                  New Customer
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 dark:bg-zinc-900/50 rounded-xl border border-slate-200 dark:border-zinc-800 items-end sm:items-center">
        <div className="flex flex-col gap-1.5 w-full">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Date From
          </span>
          <DateTimePicker
            value={dateFrom ? new Date(dateFrom) : undefined}
            onChange={(d) => setDateFrom(d?.toISOString())}
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Date To
          </span>
          <DateTimePicker
            value={dateTo ? new Date(dateTo) : undefined}
            onChange={(d) => setDateTo(d?.toISOString())}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <DataTableToolbar
            searchKey="customer name"
            searchValue={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
            filters={[
              {
                key: "job",
                title: "Job",
                options: jobFilterOptions,
              },
              {
                key: "marital",
                title: "Marital",
                options: maritalFilterOptions,
              },
              {
                key: "education",
                title: "Education",
                options: educationFilterOptions,
              },
            ]}
            filterValues={{
              job: jobFilter,
              marital: maritalFilter,
              education: educationFilter,
            }}
            onFilterChange={(key, val) => {
              const singleVal = Array.isArray(val) ? val[0] : val;
              if (key === "job") setJobFilter(singleVal as string | undefined);
              if (key === "marital")
                setMaritalFilter(singleVal as string | undefined);
              if (key === "education")
                setEducationFilter(singleVal as string | undefined);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
            onReset={resetFilters}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 border-dashed rounded-xl"
              >
                <Hash className="mr-2 h-4 w-4" />
                Age Range
                {isAgeFiltered && (
                  <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium dark:bg-slate-800">
                    {ageMin ?? "0"}-{ageMax ?? "∞"}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Age Filter</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the minimum and maximum age.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="minAge">Min Age</Label>
                    <Input
                      id="minAge"
                      type="number"
                      placeholder="18"
                      value={ageMin ?? ""}
                      onChange={(e) => {
                        setAgeMin(
                          e.target.value ? Number(e.target.value) : undefined
                        );
                        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="maxAge">Max Age</Label>
                    <Input
                      id="maxAge"
                      type="number"
                      placeholder="100"
                      value={ageMax ?? ""}
                      onChange={(e) => {
                        setAgeMax(
                          e.target.value ? Number(e.target.value) : undefined
                        );
                        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                      }}
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <DataTable
          columns={customerColumns}
          data={data?.items ?? []}
          pageCount={data?.meta?.pages ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
