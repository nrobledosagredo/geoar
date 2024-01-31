// register-schema.ts
import { z } from "zod"

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),

  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})
