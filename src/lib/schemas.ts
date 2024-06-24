import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    }),
  description: z
    .string()
    .min(5, {
      message: "Description must be at least 5 characters.",
    })
    .max(50, {
      message: "Description must be at most 50 characters.",
    }),
  rating: z
    .preprocess(
      (val: unknown) => parseInt(val as string, 10),
      z.number().int().min(1).max(5)
    )
    .refine((val) => val >= 1 && val <= 5, {
      message: "Rating must be between 1 and 5.",
    }),
});
