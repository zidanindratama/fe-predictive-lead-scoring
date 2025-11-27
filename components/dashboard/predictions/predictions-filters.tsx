"use client";

import { useCallback, useState } from "react";
import { X, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { DateTimePicker } from "@/components/ui/date-time-picker";

export interface PredictionFilters {
  q?: string;
  predictedClass?: "YES" | "NO" | "ALL";
  probYesMin?: number;
  probYesMax?: number;
  source?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface PredictionsFiltersProps {
  filters: PredictionFilters;
  onFiltersChange: (filters: PredictionFilters) => void;
  isLoading?: boolean;
}

export function PredictionsFilters({
  filters,
  onFiltersChange,
  isLoading = false,
}: PredictionsFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const probMin = (filters.probYesMin ?? 0) * 100;
  const probMax = (filters.probYesMax ?? 1) * 100;

  const handleSearchChange = useCallback(
    (value: string) => {
      onFiltersChange({ ...filters, q: value || undefined });
    },
    [filters, onFiltersChange]
  );

  const handleClassChange = (value: string) => {
    onFiltersChange({
      ...filters,
      predictedClass:
        value === "ALL" ? undefined : (value as "YES" | "NO"),
    });
  };

  const handleProbabilityChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      probYesMin: values[0] / 100,
      probYesMax: values[1] / 100,
    });
  };

  const handleSourceChange = (value: string) => {
    onFiltersChange({
      ...filters,
      source: value || undefined,
    });
  };

  const handleDateFromChange = (value: string) => {
    onFiltersChange({
      ...filters,
      dateFrom: value || undefined,
    });
  };

  const handleDateToChange = (value: string) => {
    onFiltersChange({
      ...filters,
      dateTo: value || undefined,
    });
  };

  const handleResetFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters =
    filters.q ||
    filters.predictedClass ||
    (filters.probYesMin !== undefined && filters.probYesMin > 0) ||
    (filters.probYesMax !== undefined && filters.probYesMax < 1) ||
    filters.source ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="space-y-4">

      <div className="flex gap-2">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Filter className="h-4 w-4" />
              {hasActiveFilters && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  ●
                </Badge>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Advanced Filters</SheetTitle>
            </SheetHeader>

            <div className="space-y-6 py-6 mx-4">
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Prediction Result</Label>
                <ToggleGroup
                  type="single"
                  value={filters.predictedClass || "ALL"}
                  onValueChange={handleClassChange}
                  className="justify-start"
                >
                  <ToggleGroupItem value="ALL" aria-label="All predictions">
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem value="YES" aria-label="Yes predictions">
                    Yes (Lead)
                  </ToggleGroupItem>
                  <ToggleGroupItem value="NO" aria-label="No predictions">
                    No (Not Lead)
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold">
                    Confidence Level (Probability)
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Filter by YES probability range
                  </p>
                </div>

                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[probMin, probMax]}
                  onValueChange={handleProbabilityChange}
                  className="w-full"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Minimum</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">
                        {Math.round(probMin)}%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Maximum</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">
                        {Math.round(probMax)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">Date Range</Label>
                <div className="space-y-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">
                      From Date
                    </label>
                    <DateTimePicker 
                      value={filters.dateFrom ? new Date(filters.dateFrom) : undefined} 
                      onChange={(date) => {
                        handleDateFromChange(date ? date.toISOString() : "");
                      }}
                      disabled={isLoading} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">
                      To Date
                    </label>
                    <DateTimePicker
                      value={filters.dateTo ? new Date(filters.dateTo) : undefined}
                      onChange={(date) => {
                        handleDateToChange(date ? date.toISOString() : "");
                      }}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">Source</Label>
                <p className="text-xs text-muted-foreground">
                  Filter by campaign name or manual
                </p>
                <Input
                  placeholder="e.g. Summer Campaign or manual"
                  value={filters.source || ""}
                  onChange={(e) => handleSourceChange(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900/30"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.q && (
            <Badge variant="secondary" className="gap-2">
              Search: {filters.q}
              <X
                className="h-3 w-3 cursor-pointer hover:opacity-70"
                onClick={() => handleSearchChange("")}
              />
            </Badge>
          )}
          {filters.predictedClass && (
            <Badge variant="secondary" className="gap-2">
              Class: {filters.predictedClass}
              <X
                className="h-3 w-3 cursor-pointer hover:opacity-70"
                onClick={() => handleClassChange("ALL")}
              />
            </Badge>
          )}
          {(filters.probYesMin !== undefined ||
            filters.probYesMax !== undefined) && (
            <Badge variant="secondary" className="gap-2">
              Probability: {Math.round((filters.probYesMin ?? 0) * 100)}% -{" "}
              {Math.round((filters.probYesMax ?? 1) * 100)}%
              <X
                className="h-3 w-3 cursor-pointer hover:opacity-70"
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    probYesMin: undefined,
                    probYesMax: undefined,
                  })
                }
              />
            </Badge>
          )}
          {filters.source && (
            <Badge variant="secondary" className="gap-2">
              Source: {filters.source}
              <X
                className="h-3 w-3 cursor-pointer hover:opacity-70"
                onClick={() => handleSourceChange("")}
              />
            </Badge>
          )}
          {filters.dateFrom && (
            <Badge variant="secondary" className="gap-2">
              From: {filters.dateFrom}
              <X
                className="h-3 w-3 cursor-pointer hover:opacity-70"
                onClick={() => handleDateFromChange("")}
              />
            </Badge>
          )}
          {filters.dateTo && (
            <Badge variant="secondary" className="gap-2">
              To: {filters.dateTo}
              <X
                className="h-3 w-3 cursor-pointer hover:opacity-70"
                onClick={() => handleDateToChange("")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
