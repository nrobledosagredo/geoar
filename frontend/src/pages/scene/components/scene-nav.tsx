// scene-nav.tsx
import { useEffect, useState } from "react"
import { SceneNavIcon } from "@/pages/scene/components/scene-nav-icon"
import { SceneNavSettings } from "@/pages/scene/components/scene-nav-settings"
import { SceneNavText } from "@/pages/scene/components/scene-nav-text"
import { Info, PartyPopper } from "lucide-react"
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
              <Info className="h-7 w-7 font-semibold text-warning"></Info>
            </div>

            {/* ------------ Sección media -----------*/}
            <div className="flex-auto flex items-center justify-center text-center text-pretty">
              <p className="text-lg leading-none tracking-tight font-semibold">{t("start_message")} </p>
            </div>

            {/* ------------ Sección derecha -----------*/}
            <div className="flex-none w-16 flex items-center justify-center">
              <Info className="h-7 w-7 text-warning"></Info>
            </div>
          </>
        )

      // Contenido para el final del sendero
      case "end":
        return (
          <>
            {/* ------------ Sección izquierda -----------*/}
            <div className="flex-none w-16 flex items-center justify-center">
              <PartyPopper className="h-9 animate-pulse text-muted-foreground"></PartyPopper>
            </div>

            {/* ------------ Sección media -----------*/}
            <div className="flex-auto flex items-center justify-center text-center text-pretty">
              <p className="text-sm leading-none tracking-tight font-semibold">{t("end_message")}</p>
            </div>

            {/* ------------ Sección derecha -----------*/}
            <div className="flex-none w-16 flex items-center justify-center">
              <PartyPopper className="h-9 animate-pulse text-muted-foreground"></PartyPopper>
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
    <div className="m-1">
      <div className="w-full max-w-lg h-16 mx-auto flex rounded-lg border bg-card shadow-sm backdrop-blur-3xl">
        {renderDirectionBarContent()}
      </div>
      <div className="absolute top-[135px] right-[5px] h-full">
        <SceneNavSettings bearing={bearing ?? ""} distance={distance ?? ""} />
      </div>
    </div>
  )
}