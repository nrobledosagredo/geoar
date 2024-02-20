// scene-nav-compass.tsx
import { useGetDeviceOrientation } from "@/hooks/use-get-device-orientation.ts"
import { Button } from "@/components/ui/button"

import compassIcon from "/icons/compass.png"

export function SceneNavCompass() {
  const deviceOrientation = useGetDeviceOrientation()

  return (
    <div className="flex justify-center items-center">
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full transition duration-150 ease-in-out transform active:scale-90 h-16 w-16"
      >
        <img
          src={compassIcon}
          alt="Compass"
          className="h-12 w-12 object-contain"
          style={{ transform: `rotate(${deviceOrientation}deg)` }}
        />
      </Button>
    </div>
  )
}
