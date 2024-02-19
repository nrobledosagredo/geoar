// DirectionBar.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { DirectionDistance } from "@/pages/scene/components/direction-distance";
import { DirectionIcon } from "@/pages/scene/components/direction-icon";
import { DirectionSpeechButton } from "@/pages/scene/components/direction-speech-button";
import { DirectionCompassButton } from "@/pages/scene/components/direction-compass-button";
import { Flag, Trophy } from "lucide-react";

export function DirectionBar () {
  // Variables de estado
  const { t } = useTranslation();
  const [bearing, setBearing] = useState(null);
  const [distance, setDistance] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    // Manejador para el inicio del sendero
    const handleTrailStart = (event) => {
      // Lógica para manejar el inicio del sendero
      setStatusCode("start");
    };

    // Manejador para el final del sendero
    const handleTrailEnd = (event) => {
      // Lógica para manejar el final del sendero
      setStatusCode("end");
    };

    // Manejador para el cambio de dirección
    const handleBearingChange = (event) => {
      setBearing(event.detail.bearing);
      setDistance(event.detail.distance);
      setStatusCode(null);
    };

    document.addEventListener("trailStarted", handleTrailStart);
    document.addEventListener("trailEnded", handleTrailEnd);
    document.addEventListener("bearingChanged", handleBearingChange);

    return () => {
      document.removeEventListener("trailStarted", handleTrailStart);
      document.removeEventListener("trailEnded", handleTrailEnd);
      document.removeEventListener("bearingChanged", handleBearingChange);
    };
  }, []);

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
        );

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
        );

      // Contenido normal para la navegación del sendero
      default:
        return (
          <>
            {/* ------------ Sección izquierda -----------*/}
            <div className="w-1/4 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <DirectionIcon direction={bearing} />
              </div>

              <div className="flex-1 flex items-center justify-center">
                <DirectionDistance distance={distance} />
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
        );
    }
  };

  return (
    <div className="h-24 flex mx-1 my-1 rounded-xl bg-green-600 text-white bg-opacity-95">
      {renderDirectionBarContent()}

      {/* ------------- Barra vertical de botones ------------*/}
      <div className="absolute right-0 top-0 translate-y-24 h-full flex flex-col items-center mx-4 my-4 space-y-4">
        <DirectionCompassButton />
        <DirectionSpeechButton bearing={bearing} distance={distance} />
      </div>
    </div>
  );
};