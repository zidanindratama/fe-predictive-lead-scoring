"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, Search, User } from "lucide-react";
import { useDebounce } from "use-debounce";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useGetData } from "@/hooks/use-get-data";

interface CustomerComboboxProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CustomerCombobox({
  value,
  onChange,
  disabled,
}: CustomerComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const { data, isLoading } = useGetData<{ items: any[] }>(
    ["customers", debouncedSearch],
    "/customers",
    {
      page: 1,
      limit: 10,
      q: debouncedSearch,
    }
  );

  const { data: selectedCustomer } = useGetData<any>(
    ["customers", value ?? ""],
    `/customers/${value}`,
    undefined,
    { enabled: !!value && !data?.items.find((c) => c.id === value) }
  );

  const customers = data?.items || [];

  const displayLabel =
    customers.find((c) => c.id === value)?.name ||
    selectedCustomer?.name ||
    "Select customer...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between pl-3 font-normal"
          disabled={disabled}
        >
          {value ? (
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              {displayLabel}
            </span>
          ) : (
            <span className="text-muted-foreground">Select customer...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Search customer by name..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <CommandList>
            {isLoading && (
              <div className="py-6 text-center text-sm text-muted-foreground flex justify-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading...
              </div>
            )}
            {!isLoading && customers.length === 0 && (
              <CommandEmpty>No customer found.</CommandEmpty>
            )}
            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.id}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === customer.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{customer.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {customer.job} • {customer.age} yo
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
