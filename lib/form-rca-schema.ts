import * as z from "zod";

export const profileRcaSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  lastname: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  email: z
    .string()
    .email({ message: "Product Name must be at least 3 characters" }),
  contactno: z.coerce.number(),
  accountInformation: z.coerce.number(),
  accountRouting: z.string(),
  bankName: z.string(),
  country: z.string().min(1, { message: "Please select a category" }),
  city: z.string().min(1, { message: "Please select a category" }),
  // jobs array is for the dynamic fields
  social: z.array(
    z.object({
      platformName: z.string().min(1, { message: "Please select a Platform Name" }),
      profileName: z.string().min(1, { message: "Please Enter the Profile name " })
    }),
  ),

});

export type ProfileFormRcaValues = z.infer<typeof profileRcaSchema>;
