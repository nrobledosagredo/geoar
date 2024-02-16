// use-get-points.ts
import { useEffect, useState } from "react"
import { getPoints } from "@/services/points-service"

import { Point } from "@/types/point"

export function useGetPoints (trailId: string) {
  const [points, setPoints] = useState<Point[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleGetPoints = async () => {
      try {
        setLoading(true)
        const points = await getPoints(trailId)
        setPoints(points)
        setError(null)
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    if (trailId) {
      handleGetPoints()
    }
  }, [trailId])

  return { points, loading, error }
}
