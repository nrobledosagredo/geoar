// use-get-trail.ts
import { useEffect, useState } from "react"
import { getTrail } from "@/services/trails-service"

import { Trail } from "@/types/trail-types"

export function useGetTrail(id: string) {
  const [trail, setTrail] = useState<Trail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleGetTrail = async () => {
      try {
        setLoading(true)
        const trail = await getTrail(id)
        setTrail(trail)
        setError(null)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    handleGetTrail()
  }, [id])

  return { trail, loading, error }
}
