// use-get-points.ts
import { useEffect, useState } from "react"
import { getPoints } from "@/services/points-service"

import { Point } from "@/types/point-types"

export function useGetPoints(trailId: string) {
  const [points, setPoints] = useState<Point[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function handleGetPoints() {
      try {
        setLoading(true)
        const points = await getPoints(trailId)
        const sortedPoints = points.sort((a, b) => a.order - b.order)
        setPoints(sortedPoints)
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
