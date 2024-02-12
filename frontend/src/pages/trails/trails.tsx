// trails.tsx
import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { Clock, Footprints, SearchX } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useFetchInfoCards } from "@/hooks/use-fetch-info-cards"
import { useFetchTrails } from "@/hooks/use-fetch-trails"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { DifficultyStars } from "@/components/difficulty-stars"
import { MainNav } from "@/components/main-nav"
import { SearchBar } from "@/components/search-bar"
import { SkeletonCard } from "@/components/skeleton-card"

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

  useEffect(() => {
    // Verificar si hay algún error
    if (errorTrails || errorInfoCards) {
      // Mostrar el toast de error
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

  // Combinar trails con las imágenes de sus infoCards correspondientes
  const trailsWithImages = filteredTrails.map((trail) => ({
    ...trail,
    images: trail.infoCards.flatMap(
      (infoCard) =>
        infoCards
          .find((ic) => ic._id === infoCard._id)
          ?.images.map((image) => `/info-cards/${image}`) || []
    ),
  }))

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = trailsWithImages.slice(indexOfFirstCard, indexOfLastCard)
  const totalPages = Math.ceil(trailsWithImages.length / cardsPerPage)

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 backdrop-blur-3xl z-50">
        <MainNav />
        <div className="pointer-events-none absolute top-3 w-full pl-32 pr-16  sm:w-[350px] sm:px-0 sm:right-16">
          <div className="pointer-events-auto">
            <SearchBar onSearch={setSearchTerm} />
          </div>
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
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => navigate(`/trails/${trail._id}`)}
                >
                  <CardTitle className="text-center">{trail.name}</CardTitle>
                </CardHeader>

                {/* Contenido de la tarjeta */}
                <CardContent>
                  {trail.images && trail.images.length > 0 ? (
                    <Carousel
                      opts={{
                        align: "start",
                      }}
                      plugins={[
                        Autoplay({
                          delay: 5000,
                        }),
                      ]}
                    >
                      <CarouselContent>
                        {trail.images.map((image, index) => (
                          <CarouselItem
                            key={index}
                            className="flex justify-center"
                          >
                            <AspectRatio ratio={20 / 9}>
                              <img
                                src={image}
                                alt={`Trail image ${index + 1}`}
                                className="border rounded-lg object-cover w-full h-full"
                              />
                            </AspectRatio>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  ) : (
                    <div>No images available</div>
                  )}
                </CardContent>

                {/* Footer de la tarjeta */}
                <CardFooter
                  className="flex justify-between text-center cursor-pointer"
                  onClick={() => navigate(`/trails/${trail._id}`)}
                >
                  {/* Dificultad */}
                  <div className="basis-1/3 flex flex-col items-center justify-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <DifficultyStars difficulty={trail.difficulty} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {t("difficulty_tooltip")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <div className="mt-1">{trail.difficulty}</div>
                  </div>

                  {/* Distancia */}
                  <div className="basis-1/3 flex flex-col items-center justify-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Footprints className="h-6" />
                        </TooltipTrigger>
                        <TooltipContent>{t("distance_tooltip")}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {trail.distance.value} {trail.distance.unit}
                  </div>

                  {/* Duración */}
                  <div className="basis-1/3 flex flex-col items-center justify-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Clock className="h-6" />
                        </TooltipTrigger>
                        <TooltipContent>{t("duration_tooltip")}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {trail.duration.value} {trail.duration.unit}
                  </div>
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
