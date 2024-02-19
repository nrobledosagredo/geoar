// arrow.tsx
import { config } from "@/pages/scene/scene-config"

import { useUpdateTarget } from "@/hooks/use-update-target"

const arrowScale = config.arrowScale
const arrowPositionX = config.arrowPositionX
const arrowPositionY = config.arrowPositionY
const arrowPositionZ = config.arrowPositionZ

export function Arrow() {
  const target = useUpdateTarget()

  return (
    <>
      {target && (
        <a-entity
          look-at={`[data-order='${target}']`}
          position={`${arrowPositionX} ${arrowPositionY} ${arrowPositionZ}`}
          scale={`${arrowScale} ${arrowScale} ${arrowScale}`}
        >
          <a-gltf-model
            gltf-model="/models/red_arrow/scene.gltf"
            rotation="170 0 0"
            color-changer="#16a34a"
          ></a-gltf-model>
        </a-entity>
      )}
    </>
  )
}
