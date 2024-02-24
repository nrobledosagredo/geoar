// trail-map.tsx
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import "leaflet/dist/leaflet.css"

import { TrailExtended } from "@/types/trail-types"
import { infoCardIcon, primaryPathOptions, treeIcon } from "@/lib/map-config"
import { config } from "@/lib/scene-config"
import { useGetPoints } from "@/hooks/use-get-points"
import { useGetTrees } from "@/hooks/use-get-trees"
import { useToast } from "@/components/ui/use-toast"
import { MapPathLayer } from "@/components/map-path-layer"
import { useTheme } from "@/components/theme-provider"

const defaultLatitude = config.simulateLatitude
const defaultLongitude = config.simulateLongitude

export function TrailMap({ trail }: { trail: TrailExtended }) {
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
      ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      : "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"

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
          center={[defaultLatitude, defaultLongitude]}
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
              <Popup className="font-bold">{tree.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  )
}
