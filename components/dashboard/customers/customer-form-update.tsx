"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { type Resolver, useForm, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Save,
  UserCog,
  CalendarDays,
  Hash,
  CreditCard,
  Phone,
  TrendingUp,
  AlertTriangle,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetData } from "@/hooks/use-get-data";
import { usePatchData } from "@/hooks/use-patch-data";
import { customerFormSchema, CustomerFormValues } from "./_schema/schema";
import {
  JOB_OPTIONS,
  MARITAL_OPTIONS,
  EDUCATION_OPTIONS,
  YES_NO_OPTIONS,
  CONTACT_OPTIONS,
  POUTCOME_OPTIONS,
} from "./_data/const";

interface CustomerFormUpdateProps {
  id: string;
}

interface AuthUser {
  role?: string;
}

export function CustomerFormUpdate({ id }: CustomerFormUpdateProps) {
  const router = useRouter();

  const { data: user } = useGetData<AuthUser>(["me"], "/auth/me");

  const { data: initialData, isLoading: isLoadingData } = useGetData<any>(
    ["customer", id],
    `/customers/${id}`
  );

  const defaultValues: DefaultValues<CustomerFormValues> = useMemo(() => {
    if (!initialData) {
      return {
        name: "",
        age: 0,
        job: "",
        marital: "single",
        education: "university.degree",
        default: "no",
        housing: "no",
        loan: "no",
        contact: "cellular",
        month: "",
        day_of_week: "",
        duration: 0,
        campaign: 0,
        pdays: 999,
        previous: 0,
        poutcome: "nonexistent",
        emp_var_rate: 0,
        cons_price_idx: 0,
        cons_conf_idx: 0,
        euribor3m: 0,
        nr_employed: 0,
      };
    }

    return {
      name: initialData.name || "",
      age: initialData.age || 0,
      job: initialData.job || "",
      marital: initialData.marital || "single",
      education: initialData.education || "university.degree",
      default: initialData.creditDefault || "no",
      housing: initialData.housing || "no",
      loan: initialData.loan || "no",
      contact: initialData.contact || "cellular",
      month: initialData.month || "jan",
      day_of_week: initialData.day_of_week || "mon",
      duration: initialData.duration || 0,
      campaign: initialData.campaign || 1,
      pdays: initialData.pdays || 999,
      previous: initialData.previous || 0,
      poutcome: initialData.poutcome || "nonexistent",
      emp_var_rate: initialData.emp_var_rate || 0,
      cons_price_idx: initialData.cons_price_idx || 0,
      cons_conf_idx: initialData.cons_conf_idx || 0,
      euribor3m: initialData.euribor3m || 0,
      nr_employed: initialData.nr_employed || 0,
    };
  }, [initialData]);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(
      customerFormSchema
    ) as unknown as Resolver<CustomerFormValues>,
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      form.reset(defaultValues);
    }
  }, [initialData, defaultValues, form]);

  const { mutate: updateCustomer, isPending: isUpdating } = usePatchData<
    any,
    CustomerFormValues
  >("/customers", [["customers"], ["customer", id]], {
    onSuccess: () => {
      toast.success("Customer updated successfully");
      router.push("/dashboard/customers");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update customer");
    },
  });

  const onSubmit = (data: CustomerFormValues) => {
    updateCustomer({ id, data });
  };

  if (isLoadingData && initialData) {
    return <CustomerFormSkeleton />;
  }

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
                disabled={isUpdating}
              >
                Cancel
              </Button>
              {user?.role !== "USER" && (
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <UserCog className="w-5 h-5 text-blue-600" />
                  Edit Mode
                </h3>
                <p className="text-sm text-muted-foreground">
                  Update customer information. Changes are applied immediately
                  to the system.
                </p>
              </div>

              <Alert
                variant="default"
                className="bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-900"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Caution</AlertTitle>
                <AlertDescription className="text-xs mt-1">
                  Changing demographic info like Age or Job may affect existing
                  prediction scores for this customer.
                </AlertDescription>
              </Alert>

              <Card className="border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b pb-3">
                  <CardTitle className="text-base font-medium">
                    System Metadata
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Hash className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                        Customer ID
                      </p>
                      <p className="text-xs font-mono text-foreground break-all">
                        {id}
                      </p>
                    </div>
                  </div>
                  {initialData?.createdAt && (
                    <div className="flex items-start gap-3">
                      <CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                          Joined Date
                        </p>
                        <p className="text-sm font-medium">
                          {format(new Date(initialData.createdAt), "PPP")}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Core Profile</CardTitle>
                  <CardDescription>
                    Primary identification details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="job"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select job" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {JOB_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="marital"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MARITAL_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select education" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EDUCATION_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Accordion
                type="single"
                collapsible
                defaultValue="financial"
                className="w-full space-y-4"
              >
                <AccordionItem
                  value="financial"
                  className="border rounded-xl bg-card overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="font-semibold text-base">
                        Financial Info
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="md:col-span-1 space-y-3">
                        <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-100 dark:border-green-900/30">
                          <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-400">
                            <Wallet className="h-4 w-4" />
                            <span className="text-sm font-semibold">
                              Financial Details
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Information regarding the customer&apos;s current
                            banking products and credit history status.
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="housing"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Housing Loan?</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {YES_NO_OPTIONS.map((opt) => (
                                    <SelectItem
                                      key={opt.value}
                                      value={opt.value}
                                    >
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="loan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Personal Loan?</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {YES_NO_OPTIONS.map((opt) => (
                                    <SelectItem
                                      key={opt.value}
                                      value={opt.value}
                                    >
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="campaign"
                  className="border rounded-xl bg-card overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-base">
                        Campaign Info
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="md:col-span-1 space-y-3">
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                          <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-400">
                            <Phone className="h-4 w-4" />
                            <span className="text-sm font-semibold">
                              Contact Details
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Details of the last contact made with this customer
                            during the previous campaign.
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="month"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Month</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. may, jun" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="day_of_week"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Day</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. mon, tue" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contact"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Method</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {CONTACT_OPTIONS.map((opt) => (
                                    <SelectItem
                                      key={opt.value}
                                      value={opt.value}
                                    >
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Call Duration (sec)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pdays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pdays</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription className="text-[10px]">
                                Days since last contact (999 if none)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="previous"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Previous</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription className="text-[10px]">
                                Number of contacts before this campaign
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                          <FormField
                            control={form.control}
                            name="poutcome"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Previous Outcome</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value || ""}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {POUTCOME_OPTIONS.map((opt) => (
                                      <SelectItem
                                        key={opt.value}
                                        value={opt.value}
                                      >
                                        {opt.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="economic"
                  className="border rounded-xl bg-card overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-base">
                        Economic Indicators
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="md:col-span-1 space-y-3">
                        <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-100 dark:border-purple-900/30">
                          <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-400">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-sm font-semibold">
                              Macroeconomics
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Economic conditions at the time of contact that may
                            affect customer behavior.
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-2 grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="emp_var_rate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">
                                Emp. Var. Rate
                              </FormLabel>
                              <FormControl>
                                <Input type="number" step="0.1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="euribor3m"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">
                                Euribor 3m
                              </FormLabel>
                              <FormControl>
                                <Input type="number" step="0.001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cons_price_idx"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">CPI</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cons_conf_idx"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">
                                Conf. Idx
                              </FormLabel>
                              <FormControl>
                                <Input type="number" step="0.001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="nr_employed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">
                                Nr. Employed
                              </FormLabel>
                              <FormControl>
                                <Input type="number" step="0.1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

function CustomerFormSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />
      <div className="grid md:grid-cols-3 gap-6">
        <Skeleton className="h-64 w-full md:col-span-1" />
        <Skeleton className="h-[500px] w-full md:col-span-2" />
      </div>
    </div>
  );
}
