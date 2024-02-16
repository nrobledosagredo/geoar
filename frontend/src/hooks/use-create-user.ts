// use-create-user.ts
import { useState } from "react"
import { createUser } from "@/services/users-service"

import { User } from "@/types/user"

export function useCreateUser() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [response, setResponse] = useState<any>(null)

  const handleCreateUser = async (user: User) => {
    setLoading(true)
    setError(null)
    try {
      const result = await createUser(user)
      setResponse(result)
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return { handleCreateUser, loading, error, response }
}
