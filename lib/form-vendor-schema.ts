import * as z from "zod";

export const vendorSchema = z.object({
  vendor_name: z
    .string()
    .min(1, { message: "Vendor Name must be at least 1 characters" }),
  addressLine1: z
    .string()
    .min(1, { message: "Vendpr Address must be at least 1 characters" }),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  locationCardId:z.string()
});

export type VendorSchemaValues = z.infer<typeof vendorSchema>;
