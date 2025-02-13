import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { useTranslation } from "react-i18next"

// Extender la interfaz DeviceOrientationEvent para incluir webkitCompassHeading
declare global {
  interface DeviceOrientationEvent {
    webkitCompassHeading?: number
  }

  interface Window {
    DeviceOrientationEvent: typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<string>
    }
  }
}

export function SceneCompass() {
  const [orientation, setOrientation] = useState<number>(0)
  const { t } = useTranslation()
  const compassPoints = [
    t("directions.S"),
    t("directions.SW"),
    t("directions.W"),
    t("directions.NW"),
    t("directions.N"),
    t("directions.NE"),
    t("directions.E"),
    t("directions.SE"),
  ]

  useEffect(() => {
    const handleOrientation = (event: Event) => {
      const orientationEvent = event as DeviceOrientationEvent
      let heading = orientationEvent.alpha
      if (orientationEvent.webkitCompassHeading) {
        // iOS
        heading = orientationEvent.webkitCompassHeading
      } else if (orientationEvent.absolute && orientationEvent.alpha) {
        // Android
        heading = 360 - orientationEvent.alpha
      }
      if (heading !== null) {
        setOrientation(heading)
      }
    }

    const requestOrientationPermission = async () => {
      if (
        typeof window.DeviceOrientationEvent.requestPermission === "function"
      ) {
        const permissionState =
          await window.DeviceOrientationEvent.requestPermission()
        if (permissionState === "granted") {
          addOrientationListener()
        }
      } else {
        addOrientationListener()
      }
    }

    const addOrientationListener = () => {
      const orientationEventType: string =
        "ondeviceorientationabsolute" in window
          ? "deviceorientationabsolute"
          : "deviceorientation"
      window.addEventListener(orientationEventType, handleOrientation)
    }

    requestOrientationPermission()

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
      window.removeEventListener("deviceorientationabsolute", handleOrientation)
    }
  }, [])

  return (
    <div className="mx-1">
      <div className="flex mx-auto w-full max-w-lg h-8 bg-card rounded-b-lg border-b border-l border-r shadow-sm overflow-hidden">
        <div className="relative w-full">
          {compassPoints.map((point, index) => {
            const position =
              (((index * 45 - orientation + 360) % 360) / 360) * 100
            const isMainPoint = [
              t("directions.N"),
              t("directions.S"),
              t("directions.E"),
              t("directions.W"),
            ].includes(point)
            return (
              <div
                key={index}
                className="absolute top-1/2 transform -translate-y-1/2 text-center -ml-[6.6px]"
                style={{ left: `calc(${position}%` }}
              >
                <p
                  className={`${
                    isMainPoint
                      ? "font-bold text-lg -mb-0.5 -mt-0.5"
                      : "text-muted-foreground text-xs"
                  }`}
                >
                  {point}
                </p>

                <p
                  className={`text-xs font-bold ${
                    isMainPoint ? "" : "text-muted-foreground"
                  }`}
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
