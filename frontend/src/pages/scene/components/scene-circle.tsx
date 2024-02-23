// circle.tsx
import { CircleProps } from "@/types/scene-types"

export function SceneCircle({
  latitude,
  longitude,
  scale,
  yPosition,
  image,
  color,
  isExpanded,
  cardToggle,
}: CircleProps) {
  // Configuraciones para las líneas
  const numberOfLines = 20 // Número total de líneas
  const spacing = 4 // Espaciado entre cada línea
  const lineLength = 2 // Longitud de cada línea

  // Crea un objeto con las líneas para usar en JSX
  const lineProps: { [key: string]: string } = {}
  for (let i = 0; i < numberOfLines; i++) {
    const start = -5 - i * spacing
    const end = start - lineLength
    lineProps[`line__${i + 1}`] =
      `start: 0 ${start} 0; end: 0 ${end} 0; color: ${color}`
  }

  // Configuraciones para el círculo
  const circleScale = isExpanded ? "1 1 1" : "1.5 1.5 1.5"
  const circleOpacity = isExpanded ? "0.75" : "1"
  const linesIsVisible = isExpanded ? "false" : "true"
  const circleYPosition = -2.4 + yPosition

  return (
    <a-entity
      gps-new-entity-place={`latitude: ${latitude}; longitude: ${longitude}`}
      position={`0 ${circleYPosition} 0`}
      onClick={cardToggle}
      scale={`${scale} ${scale} ${scale}`}
      distance-displayer
    >
      <a-circle
        src={image}
        scale={circleScale}
        class="raycastable"
        side="double"
        radius="4"
        opacity={circleOpacity}
        animation="property: rotation; to: 0 360 0; loop: true; dur: 4000; easing: linear"
      >
        <a-torus
          class="raycastable"
          radius="3.5"
          opacity={circleOpacity}
          color={color}
        ></a-torus>
      </a-circle>

      <a-entity visible={linesIsVisible} {...lineProps}></a-entity>
    </a-entity>
  )
}
