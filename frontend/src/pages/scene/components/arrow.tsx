// arrow.tsx
import { config } from "@/pages/scene/config"

import { useTarget } from "@/hooks/use-target"

export function Arrow() {
  const ARROW_SCALE = config.ARROW_SCALE
  const ARROW_POSITION_X = config.ARROW_POSITION_X
  const ARROW_POSITION_Y = config.ARROW_POSITION_Y
  const ARROW_POSITION_Z = config.ARROW_POSITION_Z

  // Variables de estado
  const target = useTarget()

  return (
    <>
      {target && (
        <a-entity
          look-at={`[data-order='${target}']`}
          position={`${ARROW_POSITION_X} ${ARROW_POSITION_Y} ${ARROW_POSITION_Z}`}
          scale={`${ARROW_SCALE} ${ARROW_SCALE} ${ARROW_SCALE}`}
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
