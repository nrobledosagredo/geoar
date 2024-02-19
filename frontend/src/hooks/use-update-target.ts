// use-update-target.ts
import { useEffect, useState } from "react"

export function useUpdateTarget(): number {
  const [target, setTarget] = useState<number>(0)

  useEffect(() => {
    const handleUpdateTarget: EventListener = (event) => {
      const customEvent = event as CustomEvent<{ order: number }>
      setTarget(customEvent.detail.order)
    }

    document.addEventListener("updateTarget", handleUpdateTarget)

    return () => {
      document.removeEventListener("updateTarget", handleUpdateTarget)
    }
  }, [])

  return target
}
