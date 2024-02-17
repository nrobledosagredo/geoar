// trail-carousel.tsx
import Autoplay from "embla-carousel-autoplay"
import { TrailExtended } from "@/types/trail-types"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function TrailCarousel({ trail }: { trail: TrailExtended }) {
  return trail.infoCards && trail.infoCards.length > 0 ? (
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
        {trail.infoCards.flatMap(
          (infoCard: { images: any[] }, infoCardIndex: number) =>
            infoCard.images.map((image, imageIndex) => (
              <CarouselItem
                key={`${infoCardIndex}-${imageIndex}`}
                className="flex justify-center"
              >
                <AspectRatio ratio={20 / 9}>
                  <img
                    src={`/infocards/${image}`}
                    alt={`InfoCard image ${imageIndex + 1}`}
                    className="border rounded-lg object-cover w-full h-full"
                  />
                </AspectRatio>
              </CarouselItem>
            ))
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ) : (
    <div>No images available</div>
  )
}
