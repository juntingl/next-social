import { z } from "zod";

export const switchFollowZodSchema = z.object({
  userId: z.string(),
});

export type SwitchFollowZodSchemaType = z.infer<typeof switchFollowZodSchema>;