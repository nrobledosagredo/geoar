// user-types.ts
export interface User {
  userId: string
  dob?: Date
  ageRange?: string
  disabilities?: string[]
  language: string
}
