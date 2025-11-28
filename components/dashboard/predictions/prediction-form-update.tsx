"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Save,
  AlertTriangle,
  User,
  Briefcase,
  Heart,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useGetData } from "@/hooks/use-get-data";
import { usePatchData } from "@/hooks/use-patch-data";
import {
  predictionUpdateSchema,
  PredictionUpdateValues,
} from "./_schema/schema";

interface PredictionFormUpdateProps {
  id: string;
}

export function PredictionFormUpdate({ id }: PredictionFormUpdateProps) {
  const router = useRouter();

  const { data: prediction, isLoading } = useGetData<any>(
    ["predictions", id],
    `/predictions/${id}`
  );

  const form = useForm<PredictionUpdateValues>({
    resolver: zodResolver(
      predictionUpdateSchema
    ) as Resolver<PredictionUpdateValues>,
    defaultValues: {
      predictedClass: "NO",
      probabilityYes: 0,
      probabilityNo: 0,
      source: "",
    },
  });

  useEffect(() => {
    if (prediction) {
      let predicted: "YES" | "NO" = "NO";

      if (prediction.predictedClass) {
        const predictedStr = String(prediction.predictedClass)
          .toUpperCase()
          .trim();
        predicted = predictedStr === "YES" ? "YES" : "NO";
      }

      form.reset({
        predictedClass: predicted,
        probabilityYes: Number(prediction.probabilityYes) || 0,
        probabilityNo: Number(prediction.probabilityNo) || 0,
        source: prediction.source ? String(prediction.source) : "",
      });
    }
  }, [prediction, form]);

  const { mutate: updatePrediction, isPending } = usePatchData(
    "/predictions",
    [["predictions"]],
    { onSuccess: () => router.push("/dashboard/predictions") }
  );

  const onSubmit = (data: PredictionUpdateValues) => {
    updatePrediction({ id, data });
  };

  if (isLoading) return <PredictionFormSkeleton />;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  Manual Calibration
                </h3>
                <p className="text-sm text-muted-foreground">
                  Override the AI model's output for specific business cases.
                </p>
              </div>

              <Alert
                variant="destructive"
                className="bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-900"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription className="text-xs mt-1">
                  You are editing an AI-generated result. This should only be
                  done for correction or specific policy overrides.
                </AlertDescription>
              </Alert>

              <Card className="border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b pb-3">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-500" />
                    Customer Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Full Name
                    </span>
                    <p className="text-lg font-bold text-foreground">
                      {prediction?.customer?.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-2 rounded-lg border bg-slate-50/50 dark:bg-zinc-900/50">
                      <div className="p-2 bg-white dark:bg-zinc-800 rounded-md border shadow-sm">
                        <Briefcase className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                          Job
                        </p>
                        <p className="text-sm font-medium capitalize">
                          {prediction?.customer?.job?.replace(".", " ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded-lg border bg-slate-50/50 dark:bg-zinc-900/50">
                      <div className="p-2 bg-white dark:bg-zinc-800 rounded-md border shadow-sm">
                        <Calendar className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                          Age
                        </p>
                        <p className="text-sm font-medium">
                          {prediction?.customer?.age} years old
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded-lg border bg-slate-50/50 dark:bg-zinc-900/50">
                      <div className="p-2 bg-white dark:bg-zinc-800 rounded-md border shadow-sm">
                        <Heart className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                          Marital Status
                        </p>
                        <Badge
                          variant="secondary"
                          className="mt-0.5 capitalize font-normal"
                        >
                          {prediction?.customer?.marital}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="md:col-span-2 h-fit">
              <CardHeader>
                <CardTitle>Prediction Result</CardTitle>
                <CardDescription>
                  Adjust the classification and probability scores.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="predictedClass"
                    render={({ field }) => {
                      const value = (field.value ?? "NO") as string;
                      return (
                        <FormItem>
                          <FormLabel>Final Classification</FormLabel>
                          <Select
                            key={field.value}
                            value={value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="YES">
                                <span className="flex items-center gap-2 text-green-600 font-medium">
                                  YES (Conversion)
                                </span>
                              </SelectItem>
                              <SelectItem value="NO">
                                <span className="flex items-center gap-2 text-slate-500 font-medium">
                                  NO (No Conversion)
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The primary outcome of the prediction.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source Tag</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. manual_review" />
                        </FormControl>
                        <FormDescription>
                          Tag to identify this update source.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="p-4 rounded-lg bg-slate-50 dark:bg-zinc-900 border space-y-4">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    Confidence Scores
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="probabilityYes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase text-muted-foreground">
                            Probability YES (0-1)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.0001"
                              min="0"
                              max="1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                              className="font-mono"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="probabilityNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase text-muted-foreground">
                            Probability NO (0-1)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.0001"
                              min="0"
                              max="1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                              className="font-mono"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}

function PredictionFormSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />
      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-64 w-full md:col-span-1" />
        <Skeleton className="h-96 w-full md:col-span-2" />
      </div>
    </div>
  );
}
