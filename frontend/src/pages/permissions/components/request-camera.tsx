import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

export function RequestCamera() {
  const [cameraPermission, setCameraPermission] = useState("Not Requested");

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission("Granted");
    } catch (error) {
      setCameraPermission("Denied");
      console.error("Error requesting camera permission:", error);
    }
  };

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>Camera</AccordionTrigger>
      <AccordionContent>
        <div>
          <p>Camera Permission: {cameraPermission}</p>
          <button onClick={requestCameraPermission}>Request Camera Permission</button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
