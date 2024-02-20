// use-cache-points-loading.ts
// Hook para obtener el estado de carga de los puntos cacheados
import { useEffect, useState } from "react"

export function useCachePointsLoading() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const handleCachePointsLoading = () => {
      setLoading(false)
    }

    document.addEventListener("pointsCached", handleCachePointsLoading)

    return () => {
      document.removeEventListener("pointsCached", handleCachePointsLoading)
    }
  }, [])
  
  return loading
}
