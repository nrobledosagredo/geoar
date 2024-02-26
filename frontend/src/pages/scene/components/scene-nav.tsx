// scene-nav.tsx
import { useEffect, useState } from "react"
import { SceneNavIcon } from "@/pages/scene/components/scene-nav-icon"
import { SceneNavSettings } from "@/pages/scene/components/scene-nav-settings"
import { SceneNavText } from "@/pages/scene/components/scene-nav-text"
import { MapPin, PartyPopper } from "lucide-react"
import { useTranslation } from "react-i18next"

export function SceneNav() {
  const { t } = useTranslation()
  const [bearing, setBearing] = useState<string | null>(null)
  const [distance, setDistance] = useState<string | null>(null)
  const [statusCode, setStatusCode] = useState<null | string>(null)

  useEffect(() => {
    const handleTrailStart = () => {
      setStatusCode("start")
    }

    const handleTrailEnd = () => {
      setStatusCode("end")
    }

    const handleBearingChange = (event: Event) => {
      const customEvent = event as CustomEvent
      setBearing(customEvent.detail.bearing)
      setDistance(customEvent.detail.distance)
      setStatusCode(null)
    }

    document.addEventListener("trailStarted", handleTrailStart)
    document.addEventListener("trailEnded", handleTrailEnd)
    document.addEventListener("bearingChanged", handleBearingChange)

    return () => {
      document.removeEventListener("trailStarted", handleTrailStart)
      document.removeEventListener("trailEnded", handleTrailEnd)
      document.removeEventListener("bearingChanged", handleBearingChange)
    }
  }, [])

  // Renderizado condicional basado en el estado del sendero
  const renderDirectionBarContent = () => {
    switch (statusCode) {
      // Contenido para el inicio del sendero
      case "start":
        return (
          <>
            {/* ------------ Sección izquierda -----------*/}
            <div className="flex-none w-16 flex items-center justify-center">
              <MapPin className="h-7 w-7 font-semibold text-warning"></MapPin>
            </div>

            {/* ------------ Sección media -----------*/}
            <div className="flex-auto flex items-center justify-center text-center text-pretty">
              <p className="text-lg leading-none tracking-tight font-semibold">
                {t("start_message")}{" "}
              </p>
            </div>

            {/* ------------ Sección derecha -----------*/}
            <div className="flex-none w-16 flex items-center justify-center">
              <MapPin className="h-7 w-7 text-warning"></MapPin>
            </div>
          </>
        )

      // Contenido para el final del sendero
      case "end":
        return (
          <>
            {/* ------------ Sección izquierda -----------*/}
            <div className="flex-none w-16 flex items-center justify-center">
              <PartyPopper className="h-7 w-7 font-semibold text-primary"></PartyPopper>
            </div>

            {/* ------------ Sección media -----------*/}
            <div className="flex-auto flex items-center justify-center text-center text-pretty">
              <p className="text-lg leading-none tracking-tight font-semibold">
                {t("end_message")}
              </p>
            </div>

            {/* ------------ Sección derecha -----------*/}
            <div className="flex-none w-16 flex items-center justify-center">
              <PartyPopper className="h-7 w-7 font-semibold text-primary"></PartyPopper>
            </div>
          </>
        )

      // Contenido normal para la navegación del sendero
      default:
        return (
          <>
            {/* ------------ Sección izquierda -----------*/}
            <div className="flex-none w-24 flex items-center justify-center">
              <SceneNavIcon direction={bearing || ""} />
            </div>

            {/* ------------ Sección media -----------*/}
            <div className="flex-auto flex items-center justify-center text-center text-pretty">
              <p className="text-xl leading-none tracking-tight font-semibold">
                {t("head")} <strong>{t(`directions.${bearing}`)}</strong>
              </p>
            </div>

            {/* ------------ Sección derecha -----------*/}
            <div className="flex-none w-24 flex items-center justify-center">
              <SceneNavText distance={distance ?? ""} />
            </div>
          </>
        )
    }
  }

  return (
    <div className="mx-1 mt-1">
      <div className="w-full max-w-lg h-16 mx-auto flex rounded-t-lg border-t border-l border-r bg-card">
        {renderDirectionBarContent()}
      </div>
      <div className="absolute mx-1 mt-1 top-[96px] right-0 h-full sm:mt-0 sm:top-0 pointer-events-auto">
        <SceneNavSettings bearing={bearing ?? ""} distance={distance ?? ""} />
      </div>
    </div>
  )
}
