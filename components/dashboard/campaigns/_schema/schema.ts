import { z } from "zod";

const emptyStringToUndefined = z.literal("").transform(() => undefined);
const asOptionalNumber = z
  .union([z.coerce.number(), emptyStringToUndefined])
  .optional();

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const campaignFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  ageMin: asOptionalNumber,
  ageMax: asOptionalNumber,
  job: z.array(optionSchema).optional(),
  marital: z.array(optionSchema).optional(),
  education: z.array(optionSchema).optional(),
  housing: z.string().optional(),
  loan: z.string().optional(),
  poutcome: z.string().optional(),
});

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;
