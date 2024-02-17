// TreeCard.jsx
import { useRef } from "react"
import { Circle } from "@/pages/scene/components/circle"
import { useTranslation } from "react-i18next"
import { config } from "@/pages/scene/config"

import { TreeCardProps } from "@/types/scene-types"
import { useToggleClick } from "@/hooks/use-toggle-click"

import robotoBold from "/fonts/Roboto/Roboto-Bold.ttf"
import robotoMedium from "/fonts/Roboto/Roboto-Medium.ttf"
import robotoRegular from "/fonts/Roboto/Roboto-Regular.ttf"
import cardIcon from "/icons/g0.png"

const CARD_Y_POSITION = 13
const CARD_PRIMARY_COLOR = "#16a34a"
const CARD_SECONDARY_COLOR = "#f9f9f9"

const CONSERVATION_STATUS_COLORS: {
  [key: string]: { circleColor: string; textColor: string; text: string }
} = {
  LC: { circleColor: "#006666", textColor: "#ffffff", text: "LC" },
  NT: { circleColor: "#006666", textColor: "#9acd9a", text: "NT" },
  VU: { circleColor: "#cd9a00", textColor: "#ffffcd", text: "VU" },
  EN: { circleColor: "#cd6630", textColor: "#fecc99", text: "EN" },
  CR: { circleColor: "#cd3030", textColor: "#ffcdcd", text: "CR" },
  EW: { circleColor: "#000000", textColor: "#ffffff", text: "EW" },
  EX: { circleColor: "#000000", textColor: "#cd3030", text: "EX" },
}

export function TreeCard({
  name,
  taxonomy,
  conservationStatus,
  imageSrc,
  latitude,
  longitude,
}: TreeCardProps) {
  // Variables de entorno
  const CARD_SCALE = config.CARD_SCALE
  const CARD_DELAY = config.CARD_DELAY
  const CAMERA_HEIGHT = config.CAMERA_HEIGHT

  // Hooks de React y otras bibliotecas
  const ref = useRef(null)
  const { t } = useTranslation()
  const [isExpanded, handleToggleClick] = useToggleClick(CARD_DELAY)

  return (
    <>
      {/* Componente de círculo que actúa como marcador */}
      <Circle
        isExpanded={isExpanded}
        handleToggleClick={handleToggleClick}
        src={cardIcon}
        latitude={latitude}
        longitude={longitude}
        scale={CARD_SCALE}
        torusColor={CARD_PRIMARY_COLOR}
        cardYPosition={CARD_Y_POSITION}
      />

      {/* Entidad principal que contiene toda la información de la ficha */}
      <a-entity
        ref={ref}
        look-at="[gps-new-camera]"
        gps-new-entity-place={`latitude: ${latitude}; longitude: ${longitude}`}
        position={`0 ${CAMERA_HEIGHT} 0`}
        scale={`${CARD_SCALE} ${CARD_SCALE} ${CARD_SCALE}`}
        visible={isExpanded}
      >
        {/* Caja que contiene todos los elementos de la ficha */}
        <a-box
          color={CARD_SECONDARY_COLOR}
          width="35"
          height="55"
          position={`0 ${CARD_Y_POSITION} 0`}
        >
          {/* Sección del título de la ficha */}
          <a-plane
            color={CARD_PRIMARY_COLOR}
            width="34.8"
            height="5"
            position="0 24.8 1"
          >
            {/* Texto del título */}
            <a-troika-text
              value={name}
              font={robotoBold}
              color="black"
              font-size="2"
              depth-offset="-1"
              position="0 -0.2 0"
            ></a-troika-text>
          </a-plane>

          {/* Sección que contiene la imagen */}
          <a-plane
            src={imageSrc}
            width="32"
            height="20"
            position="0 10.9 2"
          ></a-plane>

          {/* Sección del estado de conservación */}
          <a-plane
            color={CARD_PRIMARY_COLOR}
            width="34.8"
            height="2.5"
            position="0 -1.3 1"
          >
            {/* Título de la sección de estado de conservación */}
            <a-troika-text
              value={t("conservation_status.title")}
              font={robotoMedium}
              color="black"
              font-size="1.8"
              depth-offset="-1"
              position="0 -0.2 0"
            ></a-troika-text>

            {/* Circulo con el color indicativo del estado de conservación */}
            <a-circle
              color={
                CONSERVATION_STATUS_COLORS[conservationStatus.acronym]
                  ?.circleColor || "#FFFFFF"
              }
              radius="1.2"
              position="0 -3.4 1"
            >
              {/* Acrónimo del estado de conservación */}
              <a-troika-text
                value={conservationStatus.acronym}
                font={robotoBold}
                color={
                  CONSERVATION_STATUS_COLORS[conservationStatus.acronym]
                    ?.textColor || "black"
                }
                font-size="1.2"
                depth-offset="-1"
                position="0 -0.1 0"
              ></a-troika-text>
            </a-circle>

            {/* Texto del estado de conservación */}
            <a-troika-text
              value={t(`conservation_status.${conservationStatus.acronym}`)}
              font={robotoMedium}
              color="black"
              font-size="1.6"
              depth-offset="-1"
              position="0 -5.7 0"
            ></a-troika-text>
          </a-plane>

          {/* Sección de la taxonomía */}
          <a-plane
            color={CARD_PRIMARY_COLOR}
            width="34.8"
            height="2.5"
            position="0 -9.6 1"
          >
            {/* Título de la sección de taxonomía */}
            <a-troika-text
              value={t("taxonomy.title")}
              font={robotoMedium}
              color="black"
              font-size="1.8"
              depth-offset="-1"
              position="0 -0.2 0"
            ></a-troika-text>

            {/* Texto con la taxonomía */}
            <a-troika-text
              value={`${t("taxonomy.kingdom")}:\n${t(
                "taxonomy.division"
              )}:\n${t("taxonomy.class")}:\n${t("taxonomy.order")}:\n${t(
                "taxonomy.family"
              )}:\n${t("taxonomy.genus")}:\n${t("taxonomy.species")}:
`}
              font={robotoMedium}
              color="black"
              font-size="1.6"
              anchor="left"
              line-height="1.4"
              depth-offset="-1"
              position="-16.4 -9.5 0"
            ></a-troika-text>

            <a-troika-text
              value={
                taxonomy.kingdom +
                "\n" +
                taxonomy.division +
                "\n" +
                taxonomy.class +
                "\n" +
                taxonomy.order +
                "\n" +
                taxonomy.family +
                "\n" +
                taxonomy.genus +
                "\n" +
                taxonomy.species
              }
              font={robotoRegular}
              color="black"
              font-size="1.6"
              anchor="left"
              line-height="1.4"
              depth-offset="-1"
              position="-4.3 -9.5 0"
            ></a-troika-text>
          </a-plane>
        </a-box>
      </a-entity>
    </>
  )
}
