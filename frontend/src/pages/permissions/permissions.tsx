import {
  Accordion
} from "@/components/ui/accordion"

import { RequestCamera } from "./components/request-camera"
import { RequestDeviceMotion } from "./components/request-device-motion"
import { RequestDeviceOrientation } from "./components/request-device-orientation"

export function Permissions() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-lg mx-auto">
      <RequestCamera />
      <RequestDeviceMotion />
      <RequestDeviceOrientation />
    </Accordion>
  )
}
