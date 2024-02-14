// trail-carousel.tsx
import Autoplay from "embla-carousel-autoplay";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function TrailCarousel({ trail }: { trail: any }) {
  return (
    trail.infoCards && trail.infoCards.length > 0 ? (
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
          {trail.infoCards.flatMap((infoCard: { images: any[]; }) =>
            infoCard.images.map((image, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <AspectRatio ratio={20 / 9}>
                  <img
                    src={`/infocards/${image}`}
                    alt={`InfoCard image ${index + 1}`}
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
  );
}