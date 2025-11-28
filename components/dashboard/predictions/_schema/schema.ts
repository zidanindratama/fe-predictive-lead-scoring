import { z } from "zod";

export const predictionCreateSchema = z.object({
  customerId: z
    .string({ error: "Please select a customer." })
    .min(1, "Customer is required"),
});

export type PredictionCreateValues = z.infer<typeof predictionCreateSchema>;

export const predictionUpdateSchema = z.object({
  predictedClass: z.enum(["YES", "NO"]),
  probabilityYes: z.coerce
    .number()
    .min(0)
    .max(1)
    .transform((val) => Number(val.toFixed(4))),
  probabilityNo: z.coerce
    .number()
    .min(0)
    .max(1)
    .transform((val) => Number(val.toFixed(4))),
  source: z.string().optional(),
});

export type PredictionUpdateValues = z.infer<typeof predictionUpdateSchema>;
