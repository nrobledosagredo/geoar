// use-get-trails.ts
import { useEffect, useState } from "react"
import { getTrails } from "@/services/trails-service"

import { Trail } from "@/types/trail"

import { useLanguage } from "./use-language"

export function useGetTrails() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  useEffect(() => {
    const handleGetTrails = async () => {
      try {
        setLoading(true)
        const trails = await getTrails()
        setTrails(trails)
        setError(null)
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    handleGetTrails()
  }, [language])

  return { trails, loading, error }
}
