// scene-map.tsx
import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

import "leaflet.locatecontrol"
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"
import "leaflet/dist/leaflet.css"

import { useEffect } from "react"
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
        position: "bottomleft",
        setView: "always",
        locateOptions: {
          enableHighAccuracy: true,
        },
        initialZoomLevel: 20,
        showPopup: false,
      })
      .addTo(map);

    // Iniciar la localización automáticamente
    //locateControl.start();

    return () => {
      map.removeControl(locateControl);
    };
  }, [map]);

  return null;
}

export function SceneMap({ points, infoCards, trees }: SceneMapProps) {
  const { theme } = useTheme()
  const tileLayerUrl =
    theme === "dark"
      ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      : "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
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
    <div className="border-2 dark:border-[#464843] pointer-events-auto overflow-hidden w-full max-w-lg h-[28%] fixed bottom-[-2px] left-0 right-0 mx-auto flex justify-center items-center rounded-t-full sm:rounded-lg sm:w-60 sm:h-60 sm:right-auto sm:left-0 landscape:rounded-lg landscape:w-60 landscape:h-60 landscape:right-auto landscape:left-0">
      <MapContainer
        center={[defaultLatitude, defaultLongitude]}
        zoom={20}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full rounded-t-full sm:rounded-lg landscape:rounded-lg"
      >
        {/* Capa de OpenStreetMap */}
        <TileLayer url={tileLayerUrl} />

        {/* Control de localización */}
        <LocateControl />

        {/* Capa de camino recorrido */}
        {traveledPoints.length > 0 && (
          <MapPathLayer points={traveledPoints} options={primaryPathOptions} />
        )}

        {/* Capa de camino restante */}
        {remainingPoints.length > 0 && (
          <MapPathLayer
            points={remainingPoints}
            options={secondaryPathOptions}
          />
        )}

        {/* Marcadores de tarjetas de información y árboles */}
        {infoCards.map((infoCard, index) => (
          <Marker
            key={index}
            position={[
              infoCard.geometry.coordinates[1],
              infoCard.geometry.coordinates[0],
            ]}
            icon={infoCardIcon}
          >
            <Popup className="font-bold"> {infoCard.name}</Popup>
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
            <Popup className="font-bold">{tree.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      </div>
  )
}
