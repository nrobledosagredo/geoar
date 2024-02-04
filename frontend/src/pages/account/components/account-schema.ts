import { z } from "zod";

export const accountSchema = z.object({
    dob: z.date({}),
    language: z.string({}),
  })