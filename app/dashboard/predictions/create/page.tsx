"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, ArrowLeft, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useGetData } from "@/hooks/use-get-data";
import { usePostData } from "@/hooks/use-post-data";
import { getPredictionPermissions, UserRole } from "@/components/dashboard/predictions/prediction-auth";

// ⬇️ NEW: Combobox (shadcn)
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";


interface Customer {
  id: string;
  name: string;
  age?: number;
  job?: string;
}

interface AuthUser {
  role?: string;
}

const createPredictionSchema = z.object({
  customerId: z.string().min(1, "Please select a customer"),
});

type CreatePredictionValues = z.infer<typeof createPredictionSchema>;

export default function CreatePredictionPage() {
  const router = useRouter();
  const { data: user } = useGetData<AuthUser>(["me"], "/auth/me");

  const permissions = useMemo(
    () => getPredictionPermissions((user?.role as UserRole) || undefined),
    [user?.role]
  );

  // Redirect if user doesn't have permission
  useEffect(() => {
    if (user && !permissions.canCreate) {
      toast.error("You do not have permission to create predictions");
      router.push("/dashboard/predictions");
    }
  }, [user, permissions, router]);

  const { data: customers, isLoading: isLoadingCustomers } = useGetData<Customer[]>(["customers"], "/customers");

  const form = useForm<CreatePredictionValues>({
    resolver: zodResolver(createPredictionSchema),
    defaultValues: {
      customerId: "",
    },
  });

  const { mutate: createPrediction, isPending: isCreating } = usePostData<any, CreatePredictionValues>(
    "/predictions/single",
    [["predictions"]],
    {
      onSuccess: (prediction: any) => {
        toast.success(
          `Prediction created! Probability: ${(prediction.probabilityYes * 100).toFixed(1)}%`
        );
        router.push("/dashboard/predictions");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to create prediction");
      },
    }
  );

  const onSubmit = (data: CreatePredictionValues) => {
    createPrediction({
      customerId: data.customerId
    });
  };

  return (
    <div className="flex flex-col space-y-6 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl w-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-9 w-9 rounded-xl border-slate-200 dark:border-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Create Prediction
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Trigger on-demand lead scoring for a specific customer.
          </p>
        </div>
      </div>

      {/* Content */}
      {permissions.canCreate ? (
        <Card className="border-slate-200 dark:border-zinc-800 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-slate-50">
              Select Customer
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Choose a customer to trigger real-time lead scoring.
            </CardDescription>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              The system will analyze the customer's profile and generate a predictive lead score.
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Customer Combobox */}
                <FormField
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-slate-700 dark:text-slate-200">Customer</FormLabel>
                      <FormDescription className="text-slate-500 dark:text-slate-400">
                        Search customer by name.
                      </FormDescription>

                      {isLoadingCustomers ? (
                        <Skeleton className="h-10 w-full rounded-xl" />
                      ) : (
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between rounded-xl"
                              >
                                {field.value
                                  ? customers?.items?.find((c) => c.id === field.value)?.name
                                  : "Select a customer..."}

                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>

                          <PopoverContent className="p-0 rounded-xl w-[var(--radix-popover-trigger-width)]" align="start">
                            <Command>
                              <CommandInput placeholder="Search customers..." />
                              <CommandList>
                                <CommandEmpty>No customer found.</CommandEmpty>
                                <CommandGroup>
                                  {customers?.items?.map((customer) => (
                                    <CommandItem
                                      key={customer.id}
                                      onSelect={() => field.onChange(customer.id)}
                                    >
                                      <div className="flex flex-col">
                                        <span>{customer.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {customer.age ? `${customer.age}y · ` : ""}
                                          {customer.job ?? ""}
                                        </span>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      )}

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="rounded-xl h-10 px-4"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Prediction...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Prediction
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Alert variant="destructive">
          <AlertDescription>
            You do not have permission to create predictions.
          </AlertDescription>
        </Alert>
      )}
    </div>

  );
}
