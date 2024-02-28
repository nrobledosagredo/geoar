import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

export function RequestDeviceMotion() {
  const [deviceMotionPermission, setDeviceMotionPermission] = useState("Not Requested");

  const requestDeviceMotionPermission = async () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      // iOS 13+
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        setDeviceMotionPermission(permission);
      } catch (error) {
        console.error("Error requesting device motion permission:", error);
        setDeviceMotionPermission("Denied");
      }
    } else {
      // Non-iOS devices or iOS < 13, no explicit permission required
      setDeviceMotionPermission("Granted");
    }
  };

  return (
    <AccordionItem value="item-2">
      <AccordionTrigger>Device Motion</AccordionTrigger>
      <AccordionContent>
        <div>
          <p>Device Motion Permission: {deviceMotionPermission}</p>
          <button onClick={requestDeviceMotionPermission}>Request Device Motion Permission</button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
