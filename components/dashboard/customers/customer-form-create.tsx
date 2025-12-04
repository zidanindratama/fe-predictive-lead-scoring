"use client";

import { useRouter } from "next/navigation";
import { type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  UserPlus,
  Info,
  Wallet,
  Phone,
  TrendingUp,
  User,
  Briefcase,
  GraduationCap,
  CreditCard,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

import { usePostData } from "@/hooks/use-post-data";
import { customerFormSchema, CustomerFormValues } from "./_schema/schema";
import {
  JOB_OPTIONS,
  MARITAL_OPTIONS,
  EDUCATION_OPTIONS,
  YES_NO_OPTIONS,
  CONTACT_OPTIONS,
  POUTCOME_OPTIONS,
  MONTH_OPTIONS,
  DAY_OPTIONS,
} from "./_data/const";

export function CustomerFormCreate() {
  const router = useRouter();

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(
      customerFormSchema
    ) as unknown as Resolver<CustomerFormValues>,
    defaultValues: {
      name: "",
      age: 30,
      job: "",
      marital: "single",
      education: "university.degree",
      default: "no",
      housing: "yes",
      loan: "no",
      contact: "cellular",
      month: "jan",
      day_of_week: "mon",
      duration: 0,
      campaign: 1,
      pdays: 999,
      previous: 0,
      poutcome: "nonexistent",
      emp_var_rate: 1.1,
      cons_price_idx: 93.994,
      cons_conf_idx: -36.4,
      euribor3m: 4.857,
      nr_employed: 5191,
    },
  });

  const { mutate: createCustomer, isPending } = usePostData<
    any,
    CustomerFormValues
  >("/customers", [["customers"]], {
    onSuccess: () => {
      toast.success("Customer created successfully");
      router.push("/dashboard/customers");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create customer");
    },
  });

  const onSubmit = (data: CustomerFormValues) => {
    createCustomer(data);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
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
                  <UserPlus className="mr-2 h-4 w-4" />
                )}
                Create Customer
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Details
                </h3>
                <p className="text-sm text-muted-foreground">
                  Basic demographic information used for segmentation.
                </p>
              </div>
              <Alert className="bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/50 dark:text-blue-100 dark:border-blue-900">
                <Info className="h-4 w-4" />
                <AlertTitle>Data Quality</AlertTitle>
                <AlertDescription className="text-xs mt-1">
                  Accurate job and education data significantly improves lead
                  scoring precision.
                </AlertDescription>
              </Alert>
            </div>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
                <CardDescription>Identity and social status.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. John Doe" {...field} />
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
                  name="marital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marital Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                  name="job"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                        Job
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                        Education
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
          </div>

          <Separator />

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
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {YES_NO_OPTIONS.map((opt) => (
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
                      name="loan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personal Loan?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {YES_NO_OPTIONS.map((opt) => (
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
                  <span className="font-semibold text-base">Campaign Info</span>
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full"><SelectValue placeholder="Select month" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {MONTH_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full"><SelectValue placeholder="Select day" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {DAY_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CONTACT_OPTIONS.map((opt) => (
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
                    <div className="grid grid-cols-1 gap-4 col-span-1 md:col-span-2">
                      <FormField
                        control={form.control}
                        name="poutcome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Previous Outcome</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {POUTCOME_OPTIONS.map((opt) => (
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
                          <FormLabel className="text-xs">Euribor 3m</FormLabel>
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
                          <FormLabel className="text-xs">Conf. Idx</FormLabel>
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
        </form>
      </Form>
    </div>
  );
}
