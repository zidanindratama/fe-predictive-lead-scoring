"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, ArrowLeft } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useGetData } from "@/hooks/use-get-data";
import { usePostData } from "@/hooks/use-post-data";
import { getPredictionPermissions, UserRole } from "@/components/dashboard/predictions/prediction-auth";

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

  const { data: customers, isLoading: isLoadingCustomers } = useGetData<Customer[]>(
    ["customers"],
    "/customers"
  );

  const form = useForm<CreatePredictionValues>({
    resolver: zodResolver(createPredictionSchema),
    defaultValues: {
      customerId: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate: createPrediction, isPending: isCreating } = usePostData<any, CreatePredictionValues>(
    "/predictions/single",
    [["predictions"]],
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (prediction: any) => {
        toast.success(
          `Prediction created! Probability: ${(prediction.probabilityYes * 100).toFixed(1)}%`
        );
        router.push("/dashboard/predictions");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className="flex-1 space-y-8 p-4 sm:p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Prediction</h1>
          <p className="text-muted-foreground">
            Trigger on-demand lead scoring for a specific customer
          </p>
        </div>
      </div>

      {!permissions.canCreate ? (
        <Alert variant="destructive">
          <AlertDescription>
            You do not have permission to create predictions. Only ADMIN and STAFF members can create predictions.
          </AlertDescription>
        </Alert>
      ) : (
        <Card className="border-slate-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle>Select Customer</CardTitle>
            <CardDescription>
              Choose a customer to trigger real-time lead scoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer</FormLabel>
                      <FormDescription>
                        The system will score this customer based on their profile data
                      </FormDescription>
                      {isLoadingCustomers ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a customer..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {customers?.items?.map((customer) => (
                              <SelectItem key={customer.id} value={customer.id}>
                                <div className="flex items-center gap-2">
                                  <span>{customer.name}</span>
                                  {customer.age && (
                                    <span className="text-xs text-muted-foreground">
                                      ({customer.age}y)
                                    </span>
                                  )}
                                  {customer.job && (
                                    <span className="text-xs text-muted-foreground">
                                      · {customer.job}
                                    </span>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating}>
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
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
