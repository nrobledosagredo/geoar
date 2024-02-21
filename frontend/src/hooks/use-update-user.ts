// use-update-user.ts
import { useState } from "react"
import { updateUser } from "@/services/users-service"

export function useUpdateUser() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpdateUser = async (userId: string, userData: any) => {
    setLoading(true)
    setError(null)
    try {
      await updateUser(userId, userData)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return { handleUpdateUser, loading, error }
}
