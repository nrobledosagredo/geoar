import React, { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

const compassPoints = ["S", "SE", "E", "NE", "N", "NW", "W", "SW"]

export const SceneCompass: React.FC = () => {
  const [orientation, setOrientation] = useState<number>(0)

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha } = event
      if (alpha !== null) {
        setOrientation(alpha)
      }
    }

    window.addEventListener("deviceorientation", handleOrientation)

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [])

  return (
    <div className="mx-1">
      <div className="flex mx-auto w-full max-w-lg h-8 bg-card rounded-b-lg border-b border-l border-r shadow-sm overflow-hidden">
        <div className="relative w-full">
          {compassPoints.map((point, index) => {
            const position =
              (((index * 45 - orientation + 360) % 360) / 360) * 100
            const isMainPoint = ["N", "S", "E", "W"].includes(point)
            return (
              <div
                key={index}
                className="absolute top-1/2 transform -translate-y-1/2 text-center -ml-[6.6px]"
                style={{ left: `calc(${position}%` }}
              >
                <p
                  className={`${isMainPoint ? "font-bold text-lg -mb-0.5 -mt-0.5" : "text-muted-foreground text-xs"}`}
                >
                  {point}
                </p>

                <p
                  className={`text-xs font-bold ${isMainPoint ? "" : "text-muted-foreground"}`}
                >
                  |
                </p>
              </div>
            )
          })}
          <ChevronUp
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-primary"
            fill="currentColor"
          ></ChevronUp>
        </div>
      </div>
    </div>
  )
}
