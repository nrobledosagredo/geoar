import { Clock, Footprints } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useFetchInfoCards } from "@/hooks/use-fetch-info-cards"
import { useFetchTrails } from "@/hooks/use-fetch-trails"
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DifficultyStars } from "@/components/difficulty-stars"
import { MainNav } from "@/components/main-nav"

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
  const { t } = useTranslation()

  // TODO: Mostrar skeleton
  if (loadingTrails || loadingInfoCards) return <div>Loading trails...</div>

  // TODO: Mostrar toast con error
  if (errorTrails || errorInfoCards)
    return <div>Error: {errorTrails || errorInfoCards}</div>

  // Combinar trails con las imágenes de sus infoCards correspondientes
  const trailsWithImages = trails.map((trail) => ({
    ...trail,
    images: trail.infoCards.flatMap(
      (infoCard) =>
        infoCards
          .find((ic) => ic._id === infoCard._id)
          ?.images.map((image) => `/info-cards/${image}`) || []
    ),
  }))

  return (
    <div className="flex flex-col">
      <MainNav />
      <div className="flex flex-col items-center mt-4">
        {trailsWithImages.map((trail) => (
          <Card key={trail._id} className="max-w-sm mb-4">
            <CardHeader
              className="cursor-pointer"
              onClick={() => navigate(`/trails/${trail._id}`)}
            >
              <CardTitle className="text-center">{trail.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {trail.images && trail.images.length > 0 ? (
                <Carousel
                  opts={{
                    align: "start",
                  }}
                >
                  <CarouselContent>
                    {trail.images.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="flex aspect-video justify-center"
                      >
                        <img
                          src={image}
                          alt={`Trail image ${index + 1}`}
                          className="border rounded-lg"
                        />
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
            <CardFooter
              className="flex justify-between text-center cursor-pointer"
              onClick={() => navigate(`/trails/${trail._id}`)}
            >
              <div className="basis-1/3 flex flex-col items-center justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <DifficultyStars difficulty={trail.difficulty} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{t("difficulty_tooltip")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="mt-1">{trail.difficulty}</div>
              </div>
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
    </div>
  )
}
