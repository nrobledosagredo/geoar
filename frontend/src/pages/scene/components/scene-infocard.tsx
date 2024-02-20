// infocard.tsx
import { useRef, useState } from "react"
import { SceneCircle } from "@/pages/scene/components/scene-circle"

import { InfoCardProps } from "@/types/scene-types"
import { config } from "@/lib/scene-config"
import { useMaxScroll } from "@/hooks/use-max-scroll"
import { useTextScroll } from "@/hooks/use-text-scroll"
import { useToggleClick } from "@/hooks/use-toggle-click"
import { useToggleSpeech } from "@/hooks/use-toggle-speech"

import robotoBold from "/fonts/Roboto/Roboto-Bold.ttf"
import robotoRegular from "/fonts/Roboto/Roboto-Regular.ttf"
import chevronDownIcon from "/icons/chevron-down.svg"
import chevronUpIcon from "/icons/chevron-up.svg"
import pauseIcon from "/icons/pause.svg"
import playIcon from "/icons/play.svg"
import cardIcon from "/icons/r0.png"

const cardPrimaryColor = "#ef4928"
const cardSecondaryColor = "#f9f9f9"
const cardYPosition = config.cardYPosition
const cardScale = config.cardScale
const cardDelay = config.cardDelay
const cameraHeight = config.cameraHeight

export function SceneInfoCard({
  id,
  name,
  description,
  image,
  latitude,
  longitude,
}: InfoCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isExpanded, handleToggleClick] = useToggleClick(cardDelay)
  const { speaking, toggleSpeech } = useToggleSpeech(id, description)
  const [scrollPosition, setScrollPosition] = useState(0)
  const maxScrollPosition = useMaxScroll(description)
  const { scrollTextUp, scrollTextDown, stopTextScroll } = useTextScroll(
    maxScrollPosition,
    setScrollPosition
  )

  return (
    <>
      {/* Componente de círculo que actúa como marcador */}
      <SceneCircle
        latitude={latitude}
        longitude={longitude}
        scale={cardScale}
        yPosition={cardYPosition}
        image={cardIcon}
        color={cardPrimaryColor}
        isExpanded={isExpanded}
        handleToggleClick={handleToggleClick}
      />

      {/* Entidad principal que contiene toda la información de la ficha */}
      <a-entity
        ref={ref}
        look-at="[gps-new-camera]"
        gps-new-entity-place={`latitude: ${latitude}; longitude: ${longitude}`}
        position={`0 ${cameraHeight} 0`}
        scale={`${cardScale} ${cardScale} ${cardScale}`}
        visible={isExpanded}
      >
        {/* Caja que contiene todos los elementos de la ficha */}
        <a-box
          color={cardSecondaryColor}
          width="35"
          height="55"
          position={`0 ${cardYPosition} 0`}
        >
          {/* Línea superior coloreada de la ficha */}
          <a-plane
            color={cardPrimaryColor}
            width="34.8"
            height="2"
            position="0 26.4 1"
          ></a-plane>

          {/* Línea inferior coloreada de la ficha*/}
          <a-plane
            color={cardPrimaryColor}
            width="34.8"
            height="2"
            position="0 -26.4 1"
          ></a-plane>

          {/* Sección de la imagen */}
          <a-plane src={image} width="32" height="20" position="0 14 1">
            {/* Botón TTS */}
            <a-circle
              class="raycastable"
              position="12.3 -6.5 0.2"
              radius="2.5"
              color="#ef4444"
              onClick={toggleSpeech}
              animation__click="property: scale; startEvents: click; from: 1 1 1; to: 0.9 0.9 0.9; dur: 100; easing: easeOutQuad; loop: 2; dir: alternate"
            >
              {/* Icono de play/pause */}
              <a-circle
                position="0 -0.1 0.2"
                radius="2"
                src={speaking ? pauseIcon : playIcon}
                material="transparent: true"
              ></a-circle>
            </a-circle>
          </a-plane>

          {/* Sección del título */}
          <a-troika-text
            value={name}
            font={robotoBold}
            color="black"
            font-size="2"
            line-height="1.3"
            max-width="32"
            align="center"
            anchor="center"
            baseline="center"
            position="0 -0.2 1"
          ></a-troika-text>

          {/* Sección de la descripción */}
          <a-entity position="0 1.5 0">
            {/* Texto de la descripción */}
            <a-troika-text
              value={description}
              font={robotoRegular}
              color="black"
              font-size="1.8"
              line-height="1.2"
              max-width="31"
              align="justify"
              baseline="top"
              position={`0 ${-8 + scrollPosition} 1`}
              clip-rect={`-16 ${-16 - scrollPosition} 16 ${0 - scrollPosition}`}
            ></a-troika-text>

            {/* Botón para mover el texto hacia abajo */}
            <a-plane
              class="raycastable"
              src={chevronUpIcon}
              height="4"
              width="4"
              material="transparent: true"
              position="0 -6.9 1"
              onMouseDown={scrollTextDown}
              onMouseUp={stopTextScroll}
              animation__mousedown="property: scale; startEvents: mousedown; from: 1 1 1; to: 0.8 0.8 0.8; dur: 100; easing: easeOutQuad"
              animation__mouseup="property: scale; startEvents: mouseup; from: 0.8 0.8 0.8; to: 1 1 1; dur: 100; easing: easeOutQuad"
            ></a-plane>

            {/* Botón para mover el texto hacia arriba */}
            <a-plane
              class="raycastable"
              src={chevronDownIcon}
              height="4"
              width="4"
              material="transparent: true"
              position="0 -25.2 1"
              onMouseDown={scrollTextUp}
              onMouseUp={stopTextScroll}
              animation__mousedown="property: scale; startEvents: mousedown; from: 1 1 1; to: 0.8 0.8 0.8; dur: 100; easing: easeOutQuad"
              animation__mouseup="property: scale; startEvents: mouseup; from: 0.8 0.8 0.8; to: 1 1 1; dur: 100; easing: easeOutQuad"
            ></a-plane>
          </a-entity>
        </a-box>
      </a-entity>
    </>
  )
}
