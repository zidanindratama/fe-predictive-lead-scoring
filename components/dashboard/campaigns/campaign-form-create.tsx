"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Save,
  Info,
  Users,
  Briefcase,
  GraduationCap,
  Wallet,
  LayoutDashboard,
} from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import MultipleSelector from "@/components/ui/multi-select";

import { usePostData } from "@/hooks/use-post-data";
import { EDUCATION_OPTIONS, JOB_OPTIONS, MARITAL_OPTIONS } from "./_data/const";
import { campaignFormSchema, CampaignFormValues } from "./_schema/schema";

export function CampaignFormCreate() {
  const router = useRouter();

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(
      campaignFormSchema
    ) as unknown as Resolver<CampaignFormValues>,
    defaultValues: {
      housing: "all",
      loan: "all",
      poutcome: "all",
    },
  });

  const { mutate: createCampaign, isPending } = usePostData(
    "/campaigns",
    [["campaigns"]],
    { onSuccess: () => router.push("/dashboard/campaigns") }
  );

  const onSubmit = (data: CampaignFormValues) => {
    const newCriteria: any = {};

    if (data.ageMin !== undefined || data.ageMax !== undefined) {
      newCriteria.age = {};
      if (data.ageMin !== undefined) newCriteria.age.gte = data.ageMin;
      if (data.ageMax !== undefined) newCriteria.age.lte = data.ageMax;
    }

    if (data.job && data.job.length > 0) {
      newCriteria.job = { in: data.job.map((o) => o.value) };
    }
    if (data.marital && data.marital.length > 0) {
      newCriteria.marital = { in: data.marital.map((o) => o.value) };
    }
    if (data.education && data.education.length > 0) {
      newCriteria.education = { in: data.education.map((o) => o.value) };
    }

    if (data.housing && data.housing !== "all")
      newCriteria.housing = data.housing;
    if (data.loan && data.loan !== "all") newCriteria.loan = data.loan;
    if (data.poutcome && data.poutcome !== "all")
      newCriteria.poutcome = data.poutcome;

    createCampaign({ name: data.name, criteria: newCriteria });
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
                  <Save className="mr-2 h-4 w-4" />
                )}
                Create Campaign
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-primary" />
                Campaign Info
              </h3>
              <p className="text-sm text-muted-foreground">
                Give your campaign a descriptive name.
              </p>
            </div>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Basic Details</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Q4 Student Savings Promo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Demographics
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select demographic segments. Empty fields target{" "}
                  <strong>everyone</strong>.
                </p>
              </div>
              <Alert className="bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800">
                <Info className="h-4 w-4" />
                <AlertTitle>Targeting Tip</AlertTitle>
                <AlertDescription className="text-xs mt-1">
                  Combining "Student" job with "Single" status usually yields
                  higher success rates.
                </AlertDescription>
              </Alert>
            </div>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Target Audience Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <FormLabel>Age Range</FormLabel>
                  <div className="flex items-center gap-4">
                    <FormField
                      control={form.control}
                      name="ageMin"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="number"
                                placeholder="Min"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="pl-10"
                              />
                              <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">
                                Min
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <span className="text-muted-foreground">to</span>
                    <FormField
                      control={form.control}
                      name="ageMax"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="number"
                                placeholder="Max"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="pl-10"
                              />
                              <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">
                                Max
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="job"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-muted-foreground" />{" "}
                          Job Categories
                        </FormLabel>
                        <FormControl>
                          <MultipleSelector
                            {...field}
                            defaultOptions={JOB_OPTIONS}
                            placeholder="Select jobs..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />{" "}
                          Education Level
                        </FormLabel>
                        <FormControl>
                          <MultipleSelector
                            {...field}
                            defaultOptions={EDUCATION_OPTIONS}
                            placeholder="Select education..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="marital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marital Status</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field}
                          defaultOptions={MARITAL_OPTIONS}
                          placeholder="Select marital status..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Financial & History
              </h3>
              <p className="text-sm text-muted-foreground">
                Filter based on financial products and history.
              </p>
            </div>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Financial Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="housing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Housing Loan</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="all">Any Status</SelectItem>
                            <SelectItem value="yes">Has Loan</SelectItem>
                            <SelectItem value="no">No Loan</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personal Loan</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="all">Any Status</SelectItem>
                            <SelectItem value="yes">Has Loan</SelectItem>
                            <SelectItem value="no">No Loan</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="poutcome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Outcome</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="all">Any Outcome</SelectItem>
                            <SelectItem value="success">Success</SelectItem>
                            <SelectItem value="failure">Failure</SelectItem>
                            <SelectItem value="nonexistent">
                              No Prior Contact
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
