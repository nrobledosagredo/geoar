// settings-schema.ts
import { z } from "zod"

export const settingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {}),
})
