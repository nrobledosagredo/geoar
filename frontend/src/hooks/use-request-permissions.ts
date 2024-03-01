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
  geolocation: boolean
  camera: boolean
  orientation: boolean
  motion: boolean // Agregar estado para el permiso de movimiento
}

export function useRequestPermissions(): Permissions {
  const { toast } = useToast()
  const [permissionsGranted, setPermissionsGranted] = useState<Permissions>({
    geolocation: false,
    camera: false,
    orientation: false,
    motion: false, // Inicializar el permiso de movimiento como falso
  })

  useEffect(() => {
    // Solicitar permiso de geolocalización
    navigator.geolocation.getCurrentPosition(
      () => setPermissionsGranted((prev) => ({ ...prev, geolocation: true })),
      () => {
        toast({
          title: "Permiso de geolocalización denegado",
          description: "La aplicación necesita acceso a la geolocalización.",
          variant: "destructive",
        })
        setPermissionsGranted((prev) => ({ ...prev, geolocation: false }))
      }
    )

    // Solicitar permiso de cámara
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setPermissionsGranted((prev) => ({ ...prev, camera: true })))
      .catch(() => {
        toast({
          title: "Permiso de cámara denegado",
          description: "La aplicación necesita acceso a la cámara.",
          variant: "destructive",
        })
        setPermissionsGranted((prev) => ({ ...prev, camera: false }))
      })

    // Solicitar permiso de orientación
    const requestOrientationPermission = async () => {
      if (
        typeof window.DeviceOrientationEvent.requestPermission === "function"
      ) {
        const permissionState =
          await window.DeviceOrientationEvent.requestPermission()
        setPermissionsGranted((prev) => ({
          ...prev,
          orientation: permissionState === "granted",
        }))
      } else {
        // Si no es necesario solicitar permiso, se asume que está concedido
        setPermissionsGranted((prev) => ({ ...prev, orientation: true }))
      }
    }

    // Solicitar permiso de movimiento
    const requestMotionPermission = async () => {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function"
      ) {
        // iOS 13+
        try {
          const permissionState = await (
            DeviceMotionEvent as any
          ).requestPermission()
          setPermissionsGranted((prev) => ({
            ...prev,
            motion: permissionState === "granted",
          }))
        } catch (error) {
          console.error("Error requesting device motion permission:", error)
          setPermissionsGranted((prev) => ({
            ...prev,
            motion: false,
          }))
        }
      } else {
        // Non-iOS devices or iOS < 13, no explicit permission required
        setPermissionsGranted((prev) => ({
          ...prev,
          motion: true,
        }))
      }
    }
    requestOrientationPermission()
    requestMotionPermission()
  }, [toast])

  return permissionsGranted
}
