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
import { MainNav } from "@/components/main-nav"

export function List() {
  const { trails, loading, error } = useFetchTrails()

  if (loading) return <div>Loading trails...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="flex flex-col">
      <MainNav />
      <div className="flex flex-col items-center mt-4">
        {trails.map((trail) => (
          <Card key={trail._id} className="mb-4 max-w-sm">
            <CardHeader className="">
              <CardTitle className="text-center">{trail.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel>
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-semibold">
                              {index + 1}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
            <CardFooter className="flex justify-between text-center">
              <div className="basis-1/3">
                Difficulty
                <br />
                {trail.difficulty}
              </div>
              <div className="basis-1/3">
                Distance
                <br />
                {trail.distance.value} {trail.distance.unit}
              </div>
              <div className="basis-1/3">
                Duration
                <br />
                {trail.duration.value} {trail.duration.unit}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
