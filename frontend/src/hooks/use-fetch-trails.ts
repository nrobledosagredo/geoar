// use-fetch-trails.ts
import { useEffect, useState } from "react"
import { getAllTrails } from "@/services/trails-service"

interface Distance {
  value: number
  unit: string
}

interface Duration {
  value: number
  unit: string
}

interface InfoCard {
  _id: string
  order: number
}

interface Trail {
  distance: Distance
  duration: Duration
  _id: string
  name: string
  description: string
  difficulty: string
  infoCards: InfoCard[]
}

export const useFetchTrails = () => {
  const [trails, setTrails] = useState<Trail[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        setLoading(true)
        const fetchedTrails = await getAllTrails()
        setTrails(fetchedTrails)
        setError(null)
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchTrails()
  }, [])

  return { trails, loading, error }
}
