import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import { useGetTrees } from "@/hooks/use-get-trees"

import "leaflet/dist/leaflet.css"

import { TrailWithInfoCards } from "@/types/trail-with-infocards"
import { infoCardIcon, primaryPathOptions, treeIcon } from "@/lib/map-utils"
import { useGetPoints } from "@/hooks/use-get-points"
import { useToast } from "@/components/ui/use-toast"
import { MapPathLayer } from "@/components/map-path-layer"
import { useTheme } from "@/components/theme-provider"

export function TrailMap({ trail }: { trail: TrailWithInfoCards }) {
  const DEFAULT_LAT = -39.8046
  const DEFAULT_LNG = -73.24997
  const { theme } = useTheme()
  const { toast } = useToast()
  const {
    points,
    loading: pointsLoading,
    error: pointsError,
  } = useGetPoints(trail._id)
  const { trees, loading: treesLoading, error: treesError } = useGetTrees()

  // Coordenadas de los puntos del sendero
  const pathPoints = points.map((point) => [
    point.geometry.coordinates[1],
    point.geometry.coordinates[0],
  ])

  const tileLayerUrl =
    theme === "dark"
      ? "https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}"
      : "https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}"

  // Mostrar alerta si hay errores
  useEffect(() => {
    if (pointsError || treesError) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los puntos del sendero",
        variant: "destructive",
      })
    }
  }, [pointsError, treesError, toast])

  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) =>
    e.stopPropagation()

  return (
    <div
      className="w-full h-96 relative"
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
      onPointerDown={stopPropagation}
    >
      {pointsLoading || treesLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : (
        <MapContainer
          center={[DEFAULT_LAT, DEFAULT_LNG]}
          zoom={17}
          scrollWheelZoom={false}
          zoomControl={false}
          className="w-full h-full rounded-lg border"
        >
          {/* Capa de OpenStreetMap */}
          <TileLayer url={tileLayerUrl} />

          {/* Recorrido del sendero */}
          <MapPathLayer points={pathPoints} options={primaryPathOptions} />

          {/* Marcadores de cada infoCard */}
          {trail.infoCards.map((infoCard, index) => (
            <Marker
              key={index}
              position={[
                infoCard.geometry.coordinates[1],
                infoCard.geometry.coordinates[0],
              ]}
              icon={infoCardIcon}
              title={infoCard.name}
            >
              {/* Popup con el nombre de la infoCard */}
              <Popup className="font-bold"> {infoCard.name}</Popup>
            </Marker>
          ))}

          {/* Marcadores de cada árbol */}
          {trees.map((tree, index) => (
            <Marker
              key={index}
              position={[
                tree.geometry.coordinates[1],
                tree.geometry.coordinates[0],
              ]}
              icon={treeIcon}
            >
              {/* Popup con el nombre del árbol */}
              <Popup>{tree.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  )
}
