"use client";

import { useRouter, useParams } from "next/navigation";
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
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

import { useGetData } from "@/hooks/use-get-data";
import { usePatchData } from "@/hooks/use-patch-data";
import { getPredictionPermissions, UserRole } from "@/components/dashboard/predictions/prediction-auth";

interface PredictionDetail {
  id: string;
  customerId: string;
  predictedClass: "YES" | "NO";
  probabilityYes: number;
  probabilityNo: number;
  timestamp: string;
  source: string;
  customer: {
    id: string;
    name: string;
    job?: string;
    marital?: string;
    age?: number;
  };
}

interface AuthUser {
  role?: string;
}

const updatePredictionSchema = z.object({
  predictedClass: z.enum(["YES", "NO"]),
  probabilityYes: z.number().min(0).max(1),
});

type UpdatePredictionValues = z.infer<typeof updatePredictionSchema>;

export default function UpdatePredictionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: user } = useGetData<AuthUser>(["me"], "/auth/me");

  const permissions = useMemo(
    () => getPredictionPermissions((user?.role as UserRole) || undefined),
    [user?.role]
  );

  // Redirect if user doesn't have permission
  useEffect(() => {
    if (user && !permissions.canUpdate) {
      toast.error("You do not have permission to update predictions");
      router.push("/dashboard/predictions");
    }
  }, [user, permissions, router]);

  const { data: prediction, isLoading: isLoadingPrediction } = useGetData<PredictionDetail>(
    ["predictions", id],
    `/predictions/${id}`
  );

  const form = useForm<UpdatePredictionValues>({
    resolver: zodResolver(updatePredictionSchema),
    defaultValues: {
      predictedClass: "YES",
      probabilityYes: 0.5,
    },
  });

  useEffect(() => {
    if (prediction) {
      form.reset({
        predictedClass: prediction.predictedClass,
        probabilityYes: prediction.probabilityYes,
      });
    }
  }, [prediction, form]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate: updatePrediction, isPending: isUpdating } = usePatchData<any, UpdatePredictionValues>(
    `/predictions/${id}`,
    [["predictions"]],
    {
      onSuccess: () => {
        toast.success("Prediction updated successfully");
        router.push("/dashboard/predictions");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to update prediction");
      },
    }
  );

  const onSubmit = (data: UpdatePredictionValues) => {
    updatePrediction({
      data,
    });
  };

  const probYes = form.watch("probabilityYes");
  const probYesPercent = Math.round(probYes * 100);
  const probNoPercent = 100 - probYesPercent;

  if (isLoadingPrediction) {
    return (
      <div className="flex-1 space-y-8 p-4 sm:p-8 max-w-3xl">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="flex-1 space-y-8 p-4 sm:p-8 max-w-3xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Prediction Not Found</h1>
        </div>
        <Alert variant="destructive">
          <AlertDescription>Unable to load prediction details.</AlertDescription>
        </Alert>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Update Prediction</h1>
          <p className="text-muted-foreground">
            Manually override AI prediction result for feedback loop
          </p>
        </div>
      </div>

      {!permissions.canUpdate ? (
        <Alert variant="destructive">
          <AlertDescription>
            You do not have permission to update predictions. Only ADMIN and STAFF members can update predictions.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Current Prediction Info */}
          <Card className="border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-lg">Current Prediction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-semibold mt-1">{prediction.customer.name}</p>
                  {prediction.customer.job && (
                    <p className="text-xs text-muted-foreground capitalize">
                      {prediction.customer.job}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Result</p>
                  <div className="mt-1">
                    <Badge
                      variant={
                        prediction.predictedClass === "YES"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {prediction.predictedClass}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Lead Probability</p>
                  <p className="text-2xl font-bold mt-1">
                    {Math.round(prediction.probabilityYes * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Not Lead Probability</p>
                  <p className="text-2xl font-bold mt-1">
                    {Math.round(prediction.probabilityNo * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Update Form */}
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Manual Correction</CardTitle>
              <CardDescription>
                Override the AI prediction with your manual correction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Prediction Class */}
                  <FormField
                    control={form.control}
                    name="predictedClass"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Corrected Prediction</FormLabel>
                        <FormDescription>
                          Select the correct prediction class based on your knowledge
                        </FormDescription>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="YES">YES (Lead)</SelectItem>
                            <SelectItem value="NO">NO (Not Lead)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Probability Slider */}
                  <FormField
                    control={form.control}
                    name="probabilityYes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lead Probability</FormLabel>
                        <FormDescription>
                          Adjust your confidence level: {probYesPercent}% Lead, {probNoPercent}%
                          Not Lead
                        </FormDescription>
                        <FormControl>
                          <Slider
                            min={0}
                            max={100}
                            step={1}
                            value={[probYesPercent]}
                            onValueChange={(v) => field.onChange(v[0] / 100)}
                            className="mt-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={isUpdating}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Update Prediction
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
