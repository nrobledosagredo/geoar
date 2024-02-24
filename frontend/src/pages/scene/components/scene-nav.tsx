// scene-nav.tsx
import { useEffect, useState } from "react"
import { SceneNavIcon } from "@/pages/scene/components/scene-nav-icon"
import { SceneNavSettings } from "@/pages/scene/components/scene-nav-settings"
import { SceneNavText } from "@/pages/scene/components/scene-nav-text"
import { Info, PartyPopper} from "lucide-react"
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
            <div className="flex-none w-24 flex items-center justify-center">

              <Info className="h-9 animate-pulse text-muted-foreground"></Info>
            </div>

            {/* ------------ Sección media -----------*/}
            <div className="flex-auto flex items-center justify-center text-center text-pretty">

              <p className="text-xl font-medium">{t("start_message")} </p>
            </div>

            {/* ------------ Sección derecha -----------*/}
            <div className="flex-none w-24 flex items-center justify-center">

              <Info className="h-9 animate-pulse text-muted-foreground"></Info>
            </div>
          </>
        )

      // Contenido para el final del sendero
      case "end":
        return (
          <>
            {/* ------------ Sección izquierda -----------*/}
            <div className="flex-none w-24 flex items-center justify-center">
              {" "}
              <PartyPopper className="h-9 animate-pulse text-muted-foreground"></PartyPopper>
            </div>

            {/* ------------ Sección media -----------*/}
            <div className="flex-auto flex items-center justify-center text-center text-pretty">
              {" "}
              <p className="text-xl font-medium">{t("end_message")}</p>
            </div>

            {/* ------------ Sección derecha -----------*/}
            <div className="flex-none w-24 flex items-center justify-center">
              {" "}
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
              {" "}
              {/* Alineación vertical y horizontal */}
              <SceneNavIcon direction={bearing || ""} />
            </div>

            {/* ------------ Sección media -----------*/}
            <div className="flex-auto flex items-center justify-center text-center text-pretty">
              {" "}
              {/* Alineación vertical y horizontal */}
              <p className="text-xl font-medium">
                {t("head")} <strong>{t(`directions.${bearing}`)}</strong>
              </p>
            </div>

            {/* ------------ Sección derecha -----------*/}
            <div className="flex-none w-24 flex items-center justify-center">
              {" "}
              {/* Alineación vertical y horizontal */}
              <SceneNavText distance={distance ?? ""} />
            </div>
          </>
        )
    }
  }

  return (
    <div>
      <div className="w-full max-w-lg h-20 mx-auto flex rounded-md border-2 border-primary bg-card backdrop-blur-3xl">
        {renderDirectionBarContent()}
      </div>
      <div className="absolute top-[135px] right-[5px] h-full">
        <SceneNavSettings bearing={bearing ?? ""} distance={distance ?? ""} />
      </div>
    </div>
  )
}
