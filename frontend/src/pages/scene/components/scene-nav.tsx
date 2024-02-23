// scene-nav.tsx
import { useEffect, useState } from "react"
import { SceneNavCompass } from "@/pages/scene/components/scene-nav-compass"
import { SceneNavIcon } from "@/pages/scene/components/scene-nav-icon"
import { SceneNavText } from "@/pages/scene/components/scene-nav-text"
import { SceneNavSpeechToggle } from "@/pages/scene/components/scene-nav-speech-toggle"
import { Flag, Trophy } from "lucide-react"
import { useTranslation } from "react-i18next"

export function SceneNav() {
  // Variables de estado
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
            <div className="w-1/4 flex">
              <div className="flex-1 flex items-center justify-center">
                <Flag className="h-16 w-16 animate-pulse"></Flag>
              </div>
            </div>

            {/* ------------ Sección derecha -----------*/}
            <div className="w-3/4 flex">
              <div className="flex-1 flex items-center justify-left">
                <p className="text-xl font-medium text-left">
                  {" "}
                  {t("start_message")}{" "}
                </p>
              </div>
            </div>
          </>
        )

      // Contenido para el final del sendero
      case "end":
        return (
          <>
            {/* ------------ Sección izquierda -----------*/}
            <div className="w-1/3 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <Trophy className="h-16 animate-pulse"></Trophy>
              </div>
            </div>

            {/* ------------ Sección derecha -----------*/}
            <div className="w-2/3 flex">
              <div className="flex-1 flex items-center justify-left">
                <p className="text-2xl font-semibold text-left ">
                  {t("end_message")}
                </p>
              </div>
            </div>
          </>
        )

      // Contenido normal para la navegación del sendero
      default:
        return (
          <>
            {/* ------------ Sección izquierda -----------*/}
            <div className="w-1/4 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <SceneNavIcon direction={bearing || ""} />
              </div>

              <div className="flex-1 flex items-center justify-center">
                <SceneNavText distance={distance ?? ""} />
              </div>
            </div>

            {/* ------------ Sección derecha -----------*/}
            <div className="w-3/4 flex">
              <div className="flex-1 flex items-center justify-left">
                <p className="text-2xl font-medium">{t("head")}</p>
                <span className="mx-1"></span>
                <p className="text-2xl font-bold">
                  {t(`directions.${bearing}`)}
                </p>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="h-24 flex mx-1 my-1 rounded-xl bg-green-600 text-white bg-opacity-95">
      {renderDirectionBarContent()}

      {/* ------------- Barra vertical de botones ------------*/}
      <div className="absolute right-0 top-0 translate-y-24 h-full flex flex-col items-center mx-4 my-4 space-y-4">
        <SceneNavCompass />
        <SceneNavSpeechToggle
          bearing={bearing ?? ""}
          distance={distance ?? ""}
        />
      </div>
    </div>
  )
}
