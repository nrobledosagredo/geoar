// use-get-user.ts
import { useEffect, useState } from "react"
import { getUser } from "@/services/users-service"

export function useGetUser(userId: string) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleGetUser = async () => {
      if (!userId) {
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        const userData = await getUser(userId)
        setUser(userData)
        setError(null)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    handleGetUser()
  }, [userId])

  return { user, loading, error }
}
