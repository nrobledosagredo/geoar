// trails.tsx
import { useEffect, useState } from "react"
import { SearchX } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useFetchInfoCards } from "@/hooks/use-get-infocards"
import { useFetchTrails } from "@/hooks/use-get-trails"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useToast } from "@/components/ui/use-toast"
import { MainNav } from "@/components/main-nav"
import { SearchBar } from "@/components/search-bar"
import { SkeletonCard } from "@/components/skeleton-card"
import { TrailCarousel } from "@/components/trail-carousel"
import { TrailDetails } from "@/components/trail-details"
import { TrailDrawer } from "@/components/trail-drawer"

export function Trails() {
  const {
    trails,
    loading: loadingTrails,
    error: errorTrails,
  } = useFetchTrails()
  const {
    infoCards,
    loading: loadingInfoCards,
    error: errorInfoCards,
  } = useFetchInfoCards()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage] = useState(3)

  // Mostrar alerta si hay errores
  useEffect(() => {
    if (errorTrails || errorInfoCards) {
      toast({
        title: "Error",
        description: t("trails_toast_description"),
        variant: "destructive",
      })
      navigate("/")
    }
  }, [errorTrails, errorInfoCards, navigate, toast])

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

  // Combinar trails con sus infoCards correspondientes
  const trailsWithInfoCards = filteredTrails.map((trail) => ({
    ...trail,
    infoCards: trail.infoCards.flatMap(
      (infoCardId) => infoCards.find((ic) => ic._id === infoCardId._id) || []
    ),
  }))
  const lastCardIndex = currentPage * cardsPerPage
  const firstCardIndex = lastCardIndex - cardsPerPage
  const currentCards = trailsWithInfoCards.slice(firstCardIndex, lastCardIndex)
  const totalPages = Math.ceil(trailsWithInfoCards.length / cardsPerPage)

  // Reinicia la página actual a 1 cuando cambie el término de búsqueda
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <div className="flex flex-col">
        <MainNav />
        <div className="pointer-events-none absolute top-3 w-full pl-32 pr-16  sm:w-[350px] sm:px-0 sm:right-16">
          <div className="pointer-events-auto">
            <SearchBar onSearch={setSearchTerm} />
          </div>
        </div>

      {/* Título */}
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8">
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
        {loadingTrails || loadingInfoCards
          ? // Repite SkeletonCard basado en cardsPerPage
            Array.from({ length: cardsPerPage }, (_, index) => (
              <SkeletonCard key={index} />
            ))
          : // Renderiza el contenido real aquí si no está cargando
            currentCards.map((trail) => (
              <Card key={trail._id} className="w-full md:w-[740px] mb-4">
                {/* Header de la tarjeta */}
                <CardHeader>
                  <CardTitle className="text-center">{trail.name}</CardTitle>
                </CardHeader>

                {/* Contenido de la tarjeta */}
                <CardContent>
                  <TrailCarousel trail={trail} />
                </CardContent>

                {/* Footer de la tarjeta */}
                <CardFooter className="flex flex-col">
                  <TrailDetails trail={trail} />
                  <TrailDrawer trail={trail} />
                </CardFooter>
              </Card>
            ))}
      </div>

      {/* Paginación */}
      <Pagination className="mb-4">
        <PaginationContent>
          {/* Botón de página anterior */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() =>
                currentPage !== 1 && setCurrentPage(currentPage - 1)
              }
            />
          </PaginationItem>

          {/* Páginas */}
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Botón de página siguiente */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                currentPage !== totalPages && setCurrentPage(currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
