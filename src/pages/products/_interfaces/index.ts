import * as z from "zod";

export const productSchema = z.object({
  id: z.number().nullable().optional(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
});
