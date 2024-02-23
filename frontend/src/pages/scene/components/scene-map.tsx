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
  const map = useMap();

  useEffect(() => {
    const locateControl = L.control.locate({
      position: "bottomleft",
      setView: "always",
      locateOptions: {
        enableHighAccuracy: true,
      },
      initialZoomLevel: 20,
      showPopup: false,
    }).addTo(map);

    // Modificar estilos después de que el control se haya agregado al mapa
    /*
    const locateContainer = document.querySelector('.leaflet-control-locate');
    if (locateContainer) {
      locateContainer.classList.add('top-48', 'left-8', 'border-', 'border-primary', 'bg-white', 'rounded-full', 'p-2');
    }
    */

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
    <div className="w-full max-w-2xl h-[30%] fixed bottom-0 left-0 right-0 mx-auto flex justify-center items-center overflow-hidden rounded-t-full border-2 border-primary md:rounded-tr md:w-96 md:h-96 md:left-auto md:right-0">
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
