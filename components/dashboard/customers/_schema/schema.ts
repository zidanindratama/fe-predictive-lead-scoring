import { ReactNode } from "react";
import { z } from "zod";

export const customerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.coerce.number().min(18).max(120),
  
  job: z.string().min(1, "Job is required"),
  marital: z.string().min(1, "Marital status is required"),
  education: z.string().min(1, "Education is required"),
  
  extId: z.string().optional(),
  
  default: z.string(),
  housing: z.string(),
  loan: z.string(),
  
  contact: z.enum(["cellular", "telephone"]),
  month: z.string().optional(), 
  day_of_week: z.string().optional(),
  duration: z.coerce.number().min(0),
  campaign: z.coerce.number().min(1),
  pdays: z.coerce.number(),
  previous: z.coerce.number(),
  poutcome: z.string(),
  
  emp_var_rate: z.coerce.number(),
  cons_price_idx: z.coerce.number(),
  cons_conf_idx: z.coerce.number(),
  euribor3m: z.coerce.number(),
  nr_employed: z.coerce.number(),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

export interface Customer {
  pdays: number;
  campaign: ReactNode;
  month: ReactNode;
  day_of_week: ReactNode;
  contact: ReactNode;
  nr_employed: number;
  euribor3m: number;
  cons_conf_idx: number;
  cons_price_idx: number;
  emp_var_rate: number;
  previous: ReactNode;
  duration: ReactNode;
  poutcome: string;
  id: string;
  name: string;
  age: number;
  job: string;
  marital: string;
  education: string;
  creditDefault: string; 
  housing: string;
  loan: string;
  createdAt: string;
}