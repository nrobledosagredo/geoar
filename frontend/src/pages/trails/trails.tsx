// trails.tsx
import { useEffect, useState } from "react"
import { TrailCarousel } from "@/pages/trails/components/trail-carousel"
import { TrailDetails } from "@/pages/trails/components/trail-details"
import { TrailDrawer } from "@/pages/trails/components/trail-drawer"
import { TrailPagination } from "@/pages/trails/components/trail-pagination"
import { TrailSearchBar } from "@/pages/trails/components/trail-search-bar"
import { TrailSkeleton } from "@/pages/trails/components/trail-skeleton"
import { SearchX } from "lucide-react"
import { useTranslation } from "react-i18next"

import { TrailExtended } from "@/types/trail-types"
import { useGetInfoCards } from "@/hooks/use-get-infocards"
import { useGetTrails } from "@/hooks/use-get-trails"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { MainNav } from "@/components/main-nav"

export function Trails() {
  const { trails, loading: trailsLoading, error: trailsError } = useGetTrails()
  const {
    infoCards,
    loading: infoCardsLoading,
    error: infoCardsError,
  } = useGetInfoCards()
  const { toast } = useToast()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage] = useState(3)

  // Mostrar alerta si hay errores
  useEffect(() => {
    if (trailsError || infoCardsError) {
      toast({
        title: "Error",
        description: t("trails_toast_description"),
        variant: "destructive",
      })
    }
  }, [trailsError, infoCardsError, toast])

  // Filtrar senderos por término de búsqueda
  const filteredTrails =
    searchTerm.trim() === ""
      ? trails
      : trails.filter(
          (trail) =>
            trail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trail.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            trail.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trail.distance.value.toString().includes(searchTerm) ||
            trail.distance.unit
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            trail.duration.value.toString().includes(searchTerm) ||
            trail.duration.unit.toLowerCase().includes(searchTerm.toLowerCase())
        )

  // Extiende trails con sus infoCards correspondientes
  const trailsExtended = filteredTrails.map((trail) => ({
    ...trail,
    infoCards: trail.infoCards.map((infoCard) => ({
      ...infoCard,
      ...infoCards.find((ic) => ic._id === infoCard._id),
    })),
  }))

  const lastCardIndex = currentPage * cardsPerPage
  const firstCardIndex = lastCardIndex - cardsPerPage
  const currentCards = trailsExtended.slice(firstCardIndex, lastCardIndex)
  const totalPages = Math.ceil(trailsExtended.length / cardsPerPage)

  // Reinicia la página actual a 1 cuando cambie el término de búsqueda
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <div className="flex flex-col h-full">
      <div className="fixed top-0 z-50 w-full">
        <MainNav />
        <div className="pointer-events-none absolute top-3 w-full pl-32 pr-16  md:w-[350px] md:px-0 md:right-16">
          <div className="w-full pointer-events-auto">
            <TrailSearchBar onSearch={setSearchTerm} />
          </div>
        </div>
      </div>

      {/* Título */}
      <div className="mt-16 mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8">
        <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl">
          {t("trails_title")}
        </h1>
        <p className="text-center px-4 w-full md:w-[740px] text-lg text-muted-foreground md:text-xl">
          {t("trails_description")}
        </p>

        {/* Texto de término de búsqueda y cantidad de resultados */}
        {searchTerm && filteredTrails.length > 0 && (
          <div className="mt-4">
            <span className="text-lg font-semibold">"{searchTerm}"</span>
            <span className="text-sm font-medium text-muted-foreground">
              {" "}
              {filteredTrails.length}{" "}
              {filteredTrails.length > 1 ? "resultados" : "resultado"}
            </span>
          </div>
        )}

        {/* Alerta si no hay resultados */}
        {searchTerm && filteredTrails.length === 0 && (
          <div className="mt-6 mx-4">
            <Alert variant="destructive">
              <SearchX className="h-6 mr-2" />
              <AlertTitle className="ml-2">
                {t("search_alert_title")}
              </AlertTitle>
              <AlertDescription className="ml-2">
                {t("search_alert_description", { searchTerm })}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      {/* Tarjetas de senderos */}
      <div className="flex flex-col items-center mx-4">
        {trailsLoading || infoCardsLoading
          ? // Repite SkeletonCard basado en cardsPerPage
            Array.from({ length: cardsPerPage }, (_, index) => (
              <TrailSkeleton key={index} />
            ))
          : // Renderiza el contenido real aquí si no está cargando
            currentCards.map((trail) => (
              <Card key={trail._id} className="w-full md:w-[740px] mb-4">
                {/* Header de la tarjeta */}
                <CardHeader>
                  <CardTitle className="text-center">{trail.name}</CardTitle>
                </CardHeader>

                {/* Contenido de la tarjeta */}
                <CardContent className="space-y-6">
                  <TrailCarousel trail={trail as TrailExtended} />
                  <TrailDetails trail={trail as TrailExtended} />
                </CardContent>

                {/* Footer de la tarjeta */}
                <CardFooter>
                  <TrailDrawer trail={trail as TrailExtended} />
                </CardFooter>
              </Card>
            ))}
      </div>

      {/* Paginación */}
      <TrailPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
