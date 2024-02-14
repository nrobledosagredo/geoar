import { useEffect, useState } from "react"
import { getInfoCard } from "@/services/infocards-service"

import { useLanguage } from "./use-language"

interface Geometry {
  type: "Point"
  coordinates: [number, number]
}

interface InfoCard {
  _id: string
  geometry: Geometry
  name: string
  description: string
  images: string[]
}

export function useFetchInfoCard(id: string) {
  const [infoCard, setInfoCard] = useState<InfoCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  useEffect(() => {
    async function fetchInfoCard() {
      try {
        setLoading(true)
        const fetchedInfoCard = await getInfoCard(id)
        setInfoCard(fetchedInfoCard)
        setError(null)
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchInfoCard()
    }
  }, [id, language])

  return { infoCard, loading, error }
}