import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { useState } from "react";
  
  export function RequestDeviceOrientation() {
    const [deviceOrientationPermission, setDeviceOrientationPermission] = useState("Not Requested");
  
    const requestDeviceOrientationPermission = async () => {
      if (typeof window.DeviceOrientationEvent.requestPermission === "function") {
        try {
          const permission = await window.DeviceOrientationEvent.requestPermission();
          setDeviceOrientationPermission(permission);
        } catch (error) {
          console.error("Error requesting device orientation permission:", error);
          setDeviceOrientationPermission("Denied");
        }
      } else {
        setDeviceOrientationPermission("Granted");
      }
    };
  
    return (
      <AccordionItem value="item-3">
        <AccordionTrigger>Device Orientation</AccordionTrigger>
        <AccordionContent>
          <div>
            <p>Device Orientation Permission: {deviceOrientationPermission}</p>
            <button onClick={requestDeviceOrientationPermission}>Request Device Orientation Permission</button>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }
  