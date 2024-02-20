// scene-map.tsx
import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import "leaflet.locatecontrol"
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"
import "leaflet/dist/leaflet.css"

import { useEffect } from "react"
import { useMap } from "react-leaflet"

import { SceneMapProps } from "@/types/scene-types"
import {
  infoCardIcon,
  primaryPathOptions,
  secondaryPathOptions,
  treeIcon,
} from "@/lib/map-config"
import { config } from "@/lib/scene-config"
import { useUpdateTarget } from "@/hooks/use-update-target"
import { MapPathLayer } from "@/components/map-path-layer"
import { useTheme } from "@/components/theme-provider"

const defaultLatitude = config.simulateLatitude
const defaultLongitude = config.simulateLongitude

function LocateControl() {
  const map = useMap()

  useEffect(() => {
    const locateControl = L.control
      .locate({
        position: "topright",
        setView: "once", // Centra el mapa en la ubicación del usuario solo una vez
        locateOptions: {
          enableHighAccuracy: true,
        },
        initialZoomLevel: 20, // Establece un nivel de zoom fijo cuando se encuentra la ubicación
        showPopup: false,
      })
      .addTo(map)

    return () => {
      map.removeControl(locateControl)
    }
  }, [map])

  return null
}

export function SceneMap({ points, infoCards, trees }: SceneMapProps) {
  const { theme } = useTheme()
  const tileLayerUrl =
    theme === "dark"
      ? "https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}"
      : "https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}"
  const target = useUpdateTarget()
  const traveledPoints = points
    .filter((point) => point.order < target)
    .map((point) => [
      point.geometry.coordinates[1],
      point.geometry.coordinates[0],
    ])
  const remainingPoints = points
    .filter((point) => point.order >= target - 1)
    .map((point) => [
      point.geometry.coordinates[1],
      point.geometry.coordinates[0],
    ])

  return (
    <div className="w-full sm:w-[640px] h-[30%] translate-y-20 fixed bottom-0 left-0 right-0 mx-auto flex justify-center items-center overflow-hidden  border-4 border-green-600 landscape:hidden">
      <MapContainer
        center={[defaultLatitude, defaultLongitude]}
        zoom={20}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full"
      >
        {/* Capa de OpenStreetMap */}
        <TileLayer url={tileLayerUrl} />

        <LocateControl />

        {traveledPoints.length > 0 && (
          <MapPathLayer points={traveledPoints} options={primaryPathOptions} />
        )}

        {remainingPoints.length > 0 && (
          <MapPathLayer
            points={remainingPoints}
            options={secondaryPathOptions}
          />
        )}

        {infoCards.map((infoCard, index) => (
          <Marker
            key={index}
            position={[
              infoCard.geometry.coordinates[1],
              infoCard.geometry.coordinates[0],
            ]}
            icon={infoCardIcon}
          >
            <Popup>{infoCard.name}</Popup>
          </Marker>
        ))}

        {trees.map((tree, index) => (
          <Marker
            key={index}
            position={[
              tree.geometry.coordinates[1],
              tree.geometry.coordinates[0],
            ]}
            icon={treeIcon}
          >
            <Popup>{tree.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
