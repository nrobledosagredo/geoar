// use-get-infocards-by-trail.ts
import { useEffect, useState } from "react"
import { getInfoCard } from "@/services/infocards-service"

import { InfoCard } from "@/types/infocard-types"
import { Trail } from "@/types/trail-types"
import { useLanguage } from "@/hooks/use-language"

export function useGetInfoCardsByTrail(trail: Trail) {
  const { language } = useLanguage()
  const [infoCards, setInfoCards] = useState<InfoCard[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleGetInfoCardsByTrail = async () => {
      if (trail && trail.infoCards && trail.infoCards.length > 0) {
        try {
          setLoading(true)
          const infoCardsDetailsPromises = trail.infoCards.map((ic) =>
            getInfoCard(ic._id)
          )
          const infoCardsDetails = await Promise.all(infoCardsDetailsPromises)
          setInfoCards(infoCardsDetails)
          setError(null)
        } catch (error) {
          console.error("Error al cargar las infoCards: ", error)
          setError("No se pudo cargar los detalles de las infoCards.")
        } finally {
          setLoading(false)
        }
      }
    }

    handleGetInfoCardsByTrail()
  }, [trail, language])

  return { infoCards, error, loading }
}
