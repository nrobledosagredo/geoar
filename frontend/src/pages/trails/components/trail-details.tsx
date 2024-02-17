// trail-details.tsx
import { TrailDifficulty } from "@/pages/trails/components/trail-difficulty"
import { Clock, Footprints } from "lucide-react"
import { useTranslation } from "react-i18next"

import { TrailExtended } from "@/types/trail-types"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TrailDetails({ trail }: { trail: TrailExtended }) {
  const { t } = useTranslation()
  return (
    <div className="w-full flex justify-between text-center">
      {/* Dificultad */}
      <div className="basis-1/3 flex flex-col items-center justify-center text-sm text-muted-foreground">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <TrailDifficulty difficulty={trail.difficulty} />
              </div>
            </TooltipTrigger>
            <TooltipContent>{t("difficulty_tooltip")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="mt-1">{trail.difficulty}</div>
      </div>

      {/* Distancia */}
      <div className="basis-1/3 flex flex-col items-center justify-center text-sm text-muted-foreground">
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
      <div className="basis-1/3 flex flex-col items-center justify-center text-sm text-muted-foreground">
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
    </div>
  )
}
