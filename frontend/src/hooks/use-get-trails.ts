// use-get-trails.ts
import { useEffect, useState } from "react"
import { getTrails } from "@/services/trails-service"

import { Trail } from "@/types/trail-types"

import { useLanguage } from "./use-language"

export function useGetTrails() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  useEffect(() => {
    async function handleGetTrails() {
      try {
        setLoading(true)
        const fetchedTrails = await getTrails()
        // Ordena los trails por nombre
        const sortedTrails = fetchedTrails.sort((a, b) =>
          a.name.localeCompare(b.name, language)
        )
        setTrails(sortedTrails)
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
