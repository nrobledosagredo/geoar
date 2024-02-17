// point.tsx
import { config } from "@/pages/scene/config"
import { PointProps } from "@/types/scene-types"

import robotoRegular from "/fonts/Roboto/Roboto-Regular.ttf"

export function Point({ latitude, longitude, order }: PointProps) {
  const CAMERA_HEIGHT = config.CAMERA_HEIGHT
  const POINT_IS_VISIBLE = config.POINT_IS_VISIBLE

  return (
    <>
      {/* Esfera 3D que representa el punto */}
      <a-sphere
        gps-new-entity-place={`latitude: ${latitude}; longitude: ${longitude}`}
        look-at="[gps-new-camera]"
        position={`0 ${CAMERA_HEIGHT} 0`}
        visible={POINT_IS_VISIBLE}
        scale="0.5 0.5 0.5"
        color="orange"
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
          scale="5 5 5"
          align="center"
        ></a-troika-text>
      </a-sphere>
    </>
  )
}
