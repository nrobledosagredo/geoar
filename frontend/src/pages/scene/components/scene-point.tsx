// scene-point.tsx
import { PointProps } from "@/types/scene-types"
import { config } from "@/lib/scene-config"

import robotoRegular from "/fonts/Roboto/Roboto-Regular.ttf"

const cameraHeight = config.cameraHeight
const pointIsVisible = config.pointIsVisible

export function ScenePoint({ latitude, longitude, order }: PointProps) {
  return (
    <>
      {/* Esfera 3D que representa el punto */}
      <a-sphere
        gps-new-entity-place={`latitude: ${latitude}; longitude: ${longitude}`}
        look-at="[gps-new-camera]"
        position={`0 ${cameraHeight} 0`}
        visible={pointIsVisible}
        scale="0.5 0.5 0.5"
        color="#ef4928"
        data-order={order}
        data-latitude={latitude}
        data-longitude={longitude}
      >
        {/* Texto que muestra el orden del punto */}
        <a-troika-text
          value={order.toString()}
          font={robotoRegular}
          color="black"
          position="0 0 1"
          scale="4 4 4<"
          align="center"
        ></a-troika-text>
      </a-sphere>
    </>
  )
}
