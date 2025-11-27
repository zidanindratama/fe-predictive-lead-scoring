"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  Save,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

import { useGetData } from "@/hooks/use-get-data";
import { usePatchData } from "@/hooks/use-patch-data";

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

const predictionUpdateSchema = z.object({
  predictedClass: z.enum(["YES", "NO"], { message: "Must select YES or NO" }),
  probabilityYes: z.number().min(0).max(1),
});

type PredictionUpdateValues = z.infer<typeof predictionUpdateSchema>;

interface PredictionDetailPageProps {
  id: string;
}

export function PredictionDetailPage({ id }: PredictionDetailPageProps) {
  const router = useRouter();

  const { data: prediction, isLoading } = useGetData<PredictionDetail>( ["predictions", id], `/predictions/${id}`, {} );

  const { data: user } = useGetData<AuthUser>(["me"], "/auth/me");

  const form = useForm<PredictionUpdateValues>({
    resolver: zodResolver(predictionUpdateSchema),
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

  const { mutate: updatePrediction, isPending: isUpdating } = usePatchData< // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    PredictionUpdateValues
  >(`/predictions/${id}`, [["predictions"]], {
    onSuccess: () => {
      toast.success("Prediction updated successfully");
      router.push("/dashboard/predictions");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => { 
      toast.error(
        error?.response?.data?.message || "Failed to update prediction"
      );
    },
  });

  const onSubmit = (data: PredictionUpdateValues) => {
    updatePrediction({ data });
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const probYesPercent = Math.round((form.watch("probabilityYes") ?? 0) * 100);
  const probNoPercent = 100 - probYesPercent;

  return (
    <div className="flex flex-col space-y-6 pb-14 w-full max-w-[1100px] mx-auto animate-in fade-in">

      <div className="flex items-center gap-3 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/dashboard/predictions")}
          className="h-9 w-9 rounded-xl border-slate-200 dark:border-zinc-800 shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Prediction Detail
          </h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">
            ID: {id}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : !prediction ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Unable to load prediction details
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <Card className="border-slate-200 dark:border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Current Prediction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Result
                  </span>
                  <Badge
                    variant={
                      prediction.predictedClass === "YES"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {prediction.predictedClass}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Lead Probability</span>
                    <span className="font-semibold">
                      {Math.round(prediction.probabilityYes * 100)}%
                    </span>
                  </div>
                  <Progress value={prediction.probabilityYes * 100} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Not Lead Probability</span>
                    <span className="font-semibold">
                      {Math.round(prediction.probabilityNo * 100)}%
                    </span>
                  </div>
                  <Progress value={prediction.probabilityNo * 100} className="h-2" />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-zinc-800 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Timestamp:</span>
                  <span>
                    {new Date(prediction.timestamp).toLocaleString("en-US")}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Source:</span>
                  <span className="capitalize">{prediction.source}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Customer Context</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div>
                <span className="font-semibold text-muted-foreground">Name:</span>
                <p>{prediction.customer.name}</p>
              </div>
              {prediction.customer.job && (
                <div>
                  <span className="font-semibold text-muted-foreground">Job:</span>
                  <p className="capitalize">{prediction.customer.job}</p>
                </div>
              )}
              {prediction.customer.age && (
                <div>
                  <span className="font-semibold text-muted-foreground">Age:</span>
                  <p>{prediction.customer.age}</p>
                </div>
              )}
              {prediction.customer.marital && (
                <div>
                  <span className="font-semibold text-muted-foreground">Marital:</span>
                  <p className="capitalize">{prediction.customer.marital}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {user?.role !== "USER" ? (
            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="text-base">Manual Correction</CardTitle>
              </CardHeader>
              <CardContent className="text-base">
                Is this prediction correct?
              </CardContent>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="predictedClass"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">
                            Corrected Prediction
                          </FormLabel>
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

                    <FormField
                      control={form.control}
                      name="probabilityYes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">
                            Lead Probability: {probYesPercent}% - {probNoPercent}%
                          </FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={1}
                              value={[probYesPercent]}
                              onValueChange={(v) => field.onChange(v[0] / 100)}
                              className="mt-2"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isUpdating} className="w-full">
                      {isUpdating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Update Prediction
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                You do not have permission to update predictions. Only ADMIN and STAFF can make corrections.
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
