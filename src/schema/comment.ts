import { z } from "zod";

export const addCommentZodSchema = z.object({
  desc: z.string()
    .min(1),
  postId: z.number(),
});

export type AddCommentZodSchemaType = z.infer<typeof addCommentZodSchema>;