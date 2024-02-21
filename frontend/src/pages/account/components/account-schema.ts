import { z } from "zod"

export const accountSchema = z.object({
  dob: z.date().optional(),
  language: z.string({}),
})
