import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface DeviceOrientationEvent {
    webkitCompassHeading?: number;
  }

  interface DeviceMotionEvent {
    requestPermission?: () => Promise<string>;
  }

  interface Window {
    DeviceOrientationEvent: typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<string>;
    };
    DeviceMotionEvent: typeof DeviceMotionEvent;
  }
}

interface Permissions {
  orientation: boolean;
  motion: boolean;
}

export function useRequestPermissions(): Permissions {
  const { toast } = useToast();
  const [permissionsGranted, setPermissionsGranted] = useState<Permissions>({
    orientation: false,
    motion: false,
  });

  useEffect(() => {
    // Solicitar permiso de orientación
    const requestOrientationPermission = async () => {
      if (
        typeof window.DeviceOrientationEvent.requestPermission === "function"
      ) {
        const permissionState = await window.DeviceOrientationEvent.requestPermission();
        setPermissionsGranted((prev) => ({
          ...prev,
          orientation: permissionState === "granted",
        }));
      } else {
        // Si no es necesario solicitar permiso, se asume que está concedido
        setPermissionsGranted((prev) => ({ ...prev, orientation: true }));
      }
    };

    // Solicitar permiso de movimiento
    const requestMotionPermission = async () => {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function"
      ) {
        try {
          const permissionState = await (DeviceMotionEvent as any).requestPermission();
          setPermissionsGranted((prev) => ({
            ...prev,
            motion: permissionState === "granted",
          }));
        } catch (error) {
          console.error("Error requesting device motion permission:", error);
          setPermissionsGranted((prev) => ({
            ...prev,
            motion: false,
          }));
        }
      } else {
        // Dispositivos no iOS o iOS < 13, no se requiere permiso explícito
        setPermissionsGranted((prev) => ({
          ...prev,
          motion: true,
        }));
      }
    };

    requestOrientationPermission();
    requestMotionPermission();
  }, [toast]);

  return permissionsGranted;
}
