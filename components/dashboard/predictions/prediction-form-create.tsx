"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles, BrainCircuit, Info, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { usePostData } from "@/hooks/use-post-data";
import {
  predictionCreateSchema,
  PredictionCreateValues,
} from "./_schema/schema";
import { CustomerCombobox } from "./customer-combobox";

export function PredictionFormCreate() {
  const router = useRouter();

  const form = useForm<PredictionCreateValues>({
    resolver: zodResolver(predictionCreateSchema),
  });

  const { mutate: createPrediction, isPending } = usePostData(
    "/predictions/single",
    [["predictions"]],
    {
      onSuccess: () => router.push("/dashboard/predictions"),
    }
  );

  const onSubmit = (data: PredictionCreateValues) => {
    createPrediction({ customerId: data.customerId });
  };

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
                  <Sparkles className="mr-2 h-4 w-4 fill-current" />
                )}
                Run Prediction
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-blue-600" />
                  AI Model Context
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select a customer to process. The system will extract their
                  latest profile data and run it through the trained
                  classification model.
                </p>
              </div>

              <Alert className="bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800">
                <Info className="h-4 w-4" />
                <AlertTitle>How it works</AlertTitle>
                <AlertDescription className="text-xs mt-1 space-y-2">
                  <p>
                    The model analyzes <strong>Demographics</strong> (Age, Job,
                    Education) and <strong>Financial History</strong> (Loans,
                    Previous Outcomes).
                  </p>
                  <p>
                    Result will be a binary class (YES/NO) with a probability
                    score.
                  </p>
                </AlertDescription>
              </Alert>
            </div>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Prediction Target</CardTitle>
                <CardDescription>
                  Who do you want to analyze today?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-500" />
                        Customer Name
                      </FormLabel>
                      <FormControl>
                        <CustomerCombobox
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-slate-50 dark:bg-zinc-900 p-4 rounded-lg border border-slate-100 dark:border-zinc-800 text-sm">
                  <span className="font-semibold text-foreground">Note:</span>
                  <span className="text-muted-foreground ml-1">
                    The prediction result will be saved automatically to the
                    history. You can manually calibrate the result later if
                    needed.
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
