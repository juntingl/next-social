import { z } from "zod";

export const switchFollowZodSchema = z.object({
  userId: z.string(),
});

export type SwitchFollowZodSchemaType = z.infer<typeof switchFollowZodSchema>;

export const updateProfileZodSchema = z.object({
  cover: z.string().optional(),
  name: z.string().max(60).optional(),
  surname: z.string().max(60).optional(),
  description: z.string().max(255).optional(),
  city: z.string().optional(),
  school: z.string().max(60).optional(),
  work: z.string().max(60).optional(),
  website: z.string().optional(),
});

export type UpdateProfileZodSchemaType = z.infer<typeof updateProfileZodSchema>;