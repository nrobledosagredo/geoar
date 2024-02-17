// use-get-infocards.ts
import { useEffect, useState } from "react"
import { getInfoCards } from "@/services/infocards-service"

import { InfoCard } from "@/types/infocard-types"

import { useLanguage } from "./use-language"

export function useGetInfoCards() {
  const [infoCards, setInfoCards] = useState<InfoCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  useEffect(() => {
    async function handleGetInfoCards() {
      try {
        setLoading(true)
        const infoCards = await getInfoCards()
        setInfoCards(infoCards)
        setError(null)
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    handleGetInfoCards()
  }, [language])

  return { infoCards, loading, error }
}
