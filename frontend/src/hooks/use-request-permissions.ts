import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

declare global {
  interface DeviceOrientationEvent {
    webkitCompassHeading?: number
  }

  interface DeviceMotionEvent {
    requestPermission?: () => Promise<string>
  }

  interface Window {
    DeviceOrientationEvent: typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<string>
    }
    DeviceMotionEvent: typeof DeviceMotionEvent
  }
}

interface Permissions {
  orientation: boolean
  motion: boolean
}

export function useRequestPermissions(): Permissions {
  const { toast } = useToast();
  const [permissionsGranted, setPermissionsGranted] = useState<Permissions>({
    orientation: false,
    motion: false,
  });

  useEffect(() => {
    const requestPermissions = async () => {
      // Solicitar permiso de orientación
      if (
        typeof window.DeviceOrientationEvent.requestPermission === "function" &&
        !navigator.userAgent.includes("iPhone") &&
        !navigator.userAgent.includes("iPad") &&
        !navigator.userAgent.includes("iPod")
      ) {
        await new Promise((resolve) => {
          // Simulamos la interacción del usuario al esperar un evento de click o touch
          window.addEventListener("click", resolve, { once: true });
          window.addEventListener("touchstart", resolve, { once: true });
        });
        const permissionState = await window.DeviceOrientationEvent.requestPermission();
        setPermissionsGranted((prev) => ({
          ...prev,
          orientation: permissionState === "granted",
        }));
      } else {
        // Si no es necesario solicitar permiso, se asume que está concedido
        setPermissionsGranted((prev) => ({ ...prev, orientation: true }));
      }

      // Solicitar permiso de movimiento
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function" &&
        !navigator.userAgent.includes("iPhone") &&
        !navigator.userAgent.includes("iPad") &&
        !navigator.userAgent.includes("iPod")
      ) {
        await new Promise((resolve) => {
          // Simulamos la interacción del usuario al esperar un evento de click o touch
          window.addEventListener("click", resolve, { once: true });
          window.addEventListener("touchstart", resolve, { once: true });
        });
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

    requestPermissions();
  }, [toast]);

  return permissionsGranted;
}