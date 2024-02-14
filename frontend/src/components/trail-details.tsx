import { Clock, Footprints } from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TrailDifficulty } from "@/components/trail-difficulty"

export function TrailDetails({ trail }: { trail: any }) {
  const { t } = useTranslation()
  return (
    <div className="w-full flex justify-between text-center">
      {/* Dificultad */}
      <div className="basis-1/3 flex flex-col items-center justify-center">
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
    </div>
  )
}
