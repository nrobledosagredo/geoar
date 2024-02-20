// use-get-device-orientation.ts
import { useEffect, useState } from "react"

export function useGetDeviceOrientation() {
  const [orientation, setOrientation] = useState(0)

  useEffect(() => {
    function handleGetDeviceOrientation(event: DeviceOrientationEvent) {
      let { alpha } = event
      alpha = (360 - (alpha ?? 0)) % 360
      if (alpha !== null) {
        setOrientation(alpha)
      }
    }

    window.addEventListener(
      "deviceorientation",
      handleGetDeviceOrientation,
      true
    )

    return () => {
      window.removeEventListener(
        "deviceorientation",
        handleGetDeviceOrientation,
        true
      )
    }
  }, [])

  return orientation
}
