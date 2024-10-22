import { z } from "zod";

export const addPostZodSchema = z.object({
  desc: z.string()
    .min(1),
  img: z.string().url(),
});

export type AddPostZodSchemaType = z.infer<typeof addPostZodSchema>;