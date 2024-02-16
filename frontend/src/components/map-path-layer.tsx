import { useEffect } from "react"
import { antPath } from "leaflet-ant-path"
import { useMap } from "react-leaflet"

export function MapPathLayer({
  points,
  options,
}: {
  points: any
  options: any
}) {
  const map = useMap()

  useEffect(() => {
    const path = antPath(points, options)
    map.addLayer(path)

    return () => {
      map.removeLayer(path)
    }
  }, [points, options, map])

  return null
}
