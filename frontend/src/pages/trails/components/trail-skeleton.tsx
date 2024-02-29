// trail-skeleton.tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TrailSkeleton() {
  return (
    <Card className="w-full md:w-[740px] mb-4">
      {/* Header del skeleton */}
      <CardHeader>
        <CardTitle className="space-y-1">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
        </CardTitle>
      </CardHeader>

      {/* Contenido del skeleton */}
      <CardContent className="space-y-6">
        <AspectRatio ratio={20 / 9}>
          <Skeleton className="border rounded-lg object-cover w-full h-full" />
        </AspectRatio>

        <div className="flex justify-between">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="basis-1/3 flex flex-col items-center justify-center"
            >
              <Skeleton className="h-7 w-7 rounded-full" />
              <Skeleton className="mt-2 w-20 h-3" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="w-full h-10" />
      </CardFooter>
    </Card>
  )
}
