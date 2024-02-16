import { config } from "@/pages/scene/config"
import { useParams } from "react-router-dom"

export function Scene() {
  const trailId = useParams().id
  const SIMULATE_LONGITUDE = config.SIMULATE_LONGITUDE
  const SIMULATE_LATITUDE = config.SIMULATE_LATITUDE
  const CAMERA_MAX_DISTANCE = config.CAMERA_MAX_DISTANCE

  return (
    <div className="relative bg-opacity-0 h-screen">
      <a-scene
        vr-mode-ui="enabled: false"
        cursor="rayOrigin: mouse"
        raycaster="objects: .raycastable; near: 0; far: 50000"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
        renderer="antialias: true; alpha: true"
      >
        <a-camera
          gps-new-camera={`gpsMinDistance: 5; simulateLongitude: ${String(SIMULATE_LONGITUDE)}; simulateLatitude: ${String(SIMULATE_LATITUDE)}`}
          far={CAMERA_MAX_DISTANCE}
        >
        </a-camera>
      </a-scene>
    </div>
  )
}
