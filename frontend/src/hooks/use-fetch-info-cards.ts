import { useEffect, useState } from "react"
import { getAllInfoCards } from "@/services/info-cards-service"

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

export function useFetchInfoCards() {
  const [infoCards, setInfoCards] = useState<InfoCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  useEffect(() => {
    async function fetchInfoCards() {
      try {
        setLoading(true)
        const fetchedInfoCards = await getAllInfoCards()
        setInfoCards(fetchedInfoCards)
        setError(null)
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchInfoCards()
  }, [language])

  return { infoCards, loading, error }
}
