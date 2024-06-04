import { useEffect, useState } from "react";

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
  const [permissionsGranted, setPermissionsGranted] = useState<Permissions>({
    orientation: false,
    motion: false,
  });

  const requestOrientationPermission = async () => {
    if (
      typeof window.DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const permissionState = await window.DeviceOrientationEvent.requestPermission();
        setPermissionsGranted((prev) => ({
          ...prev,
          orientation: permissionState === "granted",
        }));
      } catch (error) {
        console.error("Error requesting device orientation permission:", error);
        setPermissionsGranted((prev) => ({
          ...prev,
          orientation: false,
        }));
      }
    } else {
      setPermissionsGranted((prev) => ({ ...prev, orientation: true }));
    }
  };

  const requestMotionPermission = async () => {
    const DeviceMotionEventWithPermission = DeviceMotionEvent as unknown as {
      new (type: string, eventInitDict?: DeviceMotionEventInit): DeviceMotionEvent;
      prototype: DeviceMotionEvent;
      requestPermission?: () => Promise<string>;
    };

    if (
      typeof DeviceMotionEventWithPermission.requestPermission === "function"
    ) {
      try {
        const permissionState = await DeviceMotionEventWithPermission.requestPermission();
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
      setPermissionsGranted((prev) => ({ ...prev, motion: true }));
    }
  };

  useEffect(() => {
    const handleTouch = () => {
      requestOrientationPermission();
      requestMotionPermission();
    };

    window.addEventListener("touchend", handleTouch);
    
    return () => {
      window.removeEventListener("touchend", handleTouch);
    };
  }, []);

  return permissionsGranted;
}
