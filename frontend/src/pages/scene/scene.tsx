import { Arrow } from "@/pages/scene/components/arrow"
import { Point } from "@/pages/scene/components/point"
import { config } from "@/pages/scene/config"
import { useParams } from "react-router-dom"

import { useGetPoints } from "@/hooks/use-get-points"

import "@/lib/color-changer"
import "@/lib/target-finder"
import "@/lib/distance-displayer"

export function Scene() {
  const SIMULATE_LONGITUDE = config.SIMULATE_LONGITUDE
  const SIMULATE_LATITUDE = config.SIMULATE_LATITUDE
  const CAMERA_MAX_DISTANCE = config.CAMERA_MAX_DISTANCE
  const trailId = useParams().id
  const {
    points,
    loading: pointsLoading,
    error: pointsError,
  } = useGetPoints(trailId as string)

  if (pointsLoading) return <p>Loading...</p>
  if (pointsError) return <p>Error</p>

  return (
    <div className="relative bg-opacity-0 h-screen">
      <a-scene
        vr-mode-ui="enabled: false"
        cursor="rayOrigin: mouse"
        raycaster="objects: .raycastable; near: 0; far: 50000"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
        renderer="antialias: true; alpha: true"
        stats
      >
        <a-camera
          gps-new-camera={`gpsMinDistance: 5; simulateLatitude: ${String(SIMULATE_LATITUDE)}; simulateLongitude: ${String(SIMULATE_LONGITUDE)}`}
          far={CAMERA_MAX_DISTANCE}
          target-finder
        >
          {/* Flecha 3D que apunta al siguiente punto */}
          <Arrow />
        </a-camera>

        {/* Puntos del sendero */}
        {points.map((point, index) => (
          <Point
            key={index}
            longitude={point.geometry.coordinates[0]}
            latitude={point.geometry.coordinates[1]}
            order={point.order}
          />
        ))}
      </a-scene>
    </div>
  )
}
