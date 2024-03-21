import * as z from "zod";

export const locationCardSchema = z.object({
  locationCard_name: z
    .string()
    .min(1, { message: "Vendor Name must be at least 1 characters" }),
  addressLine1: z
    .string()
    .min(1, { message: "Vendpr Address must be at least 1 characters" }),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

export type LocationCardSchemaValues = z.infer<typeof locationCardSchema>;
