import { useEffect, useRef, useState } from "react"
import { Circle } from "@/pages/scene/components/circle"
import { config } from "@/pages/scene/config"

import { InfoCardProps } from "@/types/scene-types"
import { pauseSpeech, resumeSpeech, textToSpeech } from "@/lib/text-to-speech"
import { useToggleClick } from "@/hooks/use-toggle-click"

import robotoBold from "/fonts/Roboto/Roboto-Bold.ttf"
import robotoRegular from "/fonts/Roboto/Roboto-Regular.ttf"
import upIcon from "/icons/expand_less_FILL0_wght400_GRAD0_opsz48.svg"
import downIcon from "/icons/expand_more_FILL0_wght400_GRAD0_opsz48.svg"
import pauseIcon from "/icons/pause_FILL0_wght400_GRAD0_opsz48.svg"
import playIcon from "/icons/play_arrow_FILL0_wght400_GRAD0_opsz48.svg"
import cardIcon from "/icons/r0.png"

const CARD_Y_POSITION = 13
const CARD_PRIMARY_COLOR = "#ef4928"
const CARD_SECONDARY_COLOR = "#f9f9f9"
const CARD_SCALE = config.CARD_SCALE
const CARD_DELAY = config.CARD_DELAY
const CAMERA_HEIGHT = config.CAMERA_HEIGHT

let lastActiveCardId: string | null = null

export function InfoCard({
  id,
  name,
  description,
  imageSrc,
  latitude,
  longitude,
}: InfoCardProps) {
  const [isExpanded, handleToggleClick] = useToggleClick(CARD_DELAY)
  const [change, setChange] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [isTTSPlaying, setIsTTSPlaying] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const moveInterval = useRef<NodeJS.Timeout | null>(null)

  const adjustedDescription = description.replace(/\. /g, ".\n\n")

  // Función para mover el texto hacia abajo
  const moveDown = () => {
    moveInterval.current = setInterval(() => {
      setChange((prevChange) => {
        // Detiene el incremento si 'change' ya es 0
        return prevChange > 0 ? prevChange - 1 : 0
      })
    }, 10) // Mueve hacia arriba cada 100ms
  }

  // Función para mover el texto hacia arriba
  const moveUp = () => {
    moveInterval.current = setInterval(() => {
      setChange((prevChange) => {
        // Incrementa change solo si no se ha alcanzado el máximo desplazamiento
        const newChange = prevChange + 1
        return newChange < maxScroll ? newChange : prevChange
      })
    }, 10) // Mueve hacia abajo cada 10ms
  }

  const stopMoving = () => {
    if (moveInterval.current) {
      clearInterval(moveInterval.current)
    }
  }

  // Función para manejar el TTS
  const toggleTTS = () => {
    // Si se cambia a una nueva ficha mientras otra está pausada, iniciar TTS inmediatamente
    if (lastActiveCardId !== id && window.speechSynthesis.speaking) {
      window.dispatchEvent(new CustomEvent("ttsPlay", { detail: { id } }))
      window.speechSynthesis.cancel()

      // Iniciar TTS para la nueva ficha
      textToSpeech(adjustedDescription)
      setIsTTSPlaying(true)
      lastActiveCardId = id

      // Manejar pausa/reanudación en la misma ficha
    } else if (window.speechSynthesis.speaking) {
      if (window.speechSynthesis.paused && lastActiveCardId === id) {
        resumeSpeech()
        setIsTTSPlaying(true)
      } else {
        pauseSpeech()
        setIsTTSPlaying(false)
      }

      // Iniciar TTS si no estaba activo
    } else {
      textToSpeech(adjustedDescription)
      setIsTTSPlaying(true)
      window.dispatchEvent(new CustomEvent("ttsStart"))
    }

    lastActiveCardId = id
  }

  // Efecto para manejar el cambio de estado de reproducción de TTS
  useEffect(() => {
    const handleTTSPlay = (e: CustomEvent) => {
      if (e.detail !== id) {
        setIsTTSPlaying(false) // Cambiar a estado "no reproduciendo" si el ID es diferente
      }
    }

    // Función auxiliar para manejar el evento
    const handleEvent = (event: Event) => {
      handleTTSPlay(event as CustomEvent)
    }

    window.addEventListener("ttsPlay", handleEvent)

    return () => {
      window.removeEventListener("ttsPlay", handleEvent)
    }
  }, [id])

  // Efecto para calcular el desplazamiento máximo
  useEffect(() => {
    const charsPerLine = 45
    const lineHeight = 2.2 // Tamaño de la fuente

    // Dividir el texto en líneas
    const linesArray = adjustedDescription.split("\n")

    // Calcular el número total de líneas
    let totalLines = 0
    linesArray.forEach((line) => {
      // Añadir 1 por cada salto de línea adicional en adjustedDescription
      totalLines += Math.ceil(line.length / charsPerLine) || 1
    })

    // Calcular la altura total del texto
    const totalTextHeight = totalLines * lineHeight

    // Calcular el desplazamiento máximo
    setMaxScroll(totalTextHeight > 0 ? totalTextHeight : 0)
  }, [adjustedDescription])

  // Efecto para eliminar el intervalo de movimiento
  useEffect(() => {
    return () => {
      if (moveInterval.current) {
        clearInterval(moveInterval.current)
      }
    }
  }, [])

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
          {/* Línea superior coloreada de la ficha */}
          <a-plane
            color={CARD_PRIMARY_COLOR}
            width="34.8"
            height="2"
            position="0 26.4 1"
          ></a-plane>

          {/* Línea inferior coloreada de la ficha*/}
          <a-plane
            color={CARD_PRIMARY_COLOR}
            width="34.8"
            height="2"
            position="0 -26.4 1"
          ></a-plane>

          {/* Sección de la imagen */}
          <a-plane src={imageSrc} width="32" height="20" position="0 14 1">
            {/* Botón TTS */}
            <a-circle
              class="raycastable"
              position="12.3 -6.5 0.2"
              radius="2.5"
              color="#ef4444"
              onClick={toggleTTS}
              animation__click="property: scale; startEvents: click; from: 1 1 1; to: 0.9 0.9 0.9; dur: 100; easing: easeOutQuad; loop: 2; dir: alternate"
            >
              {/* Icono de play/pause */}
              <a-circle
                position="0 -0.1 0.2"
                radius="2"
                src={isTTSPlaying ? pauseIcon : playIcon}
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
              value={adjustedDescription}
              font={robotoRegular}
              color="black"
              font-size="1.8"
              line-height="1.2"
              max-width="31"
              align="justify"
              baseline="top"
              position={`0 ${-8 + change} 1`}
              clip-rect={`-16 ${-16 - change} 16 ${0 - change}`}
            ></a-troika-text>

            {/* Botón para mover el texto hacia abajo */}
            <a-plane
              class="raycastable"
              src={upIcon}
              height="4"
              width="4"
              material="transparent: true"
              position="0 -6.9 1"
              onMouseDown={moveDown}
              onMouseUp={stopMoving}
              animation__mousedown="property: scale; startEvents: mousedown; from: 1 1 1; to: 0.8 0.8 0.8; dur: 100; easing: easeOutQuad"
              animation__mouseup="property: scale; startEvents: mouseup; from: 0.8 0.8 0.8; to: 1 1 1; dur: 100; easing: easeOutQuad"
            ></a-plane>

            {/* Botón para mover el texto hacia arriba */}
            <a-plane
              class="raycastable"
              src={downIcon}
              height="4"
              width="4"
              material="transparent: true"
              position="0 -25.2 1"
              onMouseDown={moveUp}
              onMouseUp={stopMoving}
              animation__mousedown="property: scale; startEvents: mousedown; from: 1 1 1; to: 0.8 0.8 0.8; dur: 100; easing: easeOutQuad"
              animation__mouseup="property: scale; startEvents: mouseup; from: 0.8 0.8 0.8; to: 1 1 1; dur: 100; easing: easeOutQuad"
            ></a-plane>
          </a-entity>
        </a-box>
      </a-entity>
    </>
  )
}
