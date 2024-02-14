import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "@/components/theme-provider";

export function TrailMap() {
  const DEFAULT_LAT = -39.80512;
  const DEFAULT_LNG = -73.24997;
  const { theme } = useTheme();
  const tileLayerUrl = theme === "dark"
  ? "https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}"
  : "https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}";

  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => e.stopPropagation();

  return (
    <div
      className="w-full h-96"
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
      onPointerDown={stopPropagation}
    >
      <MapContainer
        center={[DEFAULT_LAT, DEFAULT_LNG]}
        zoom={17}
        scrollWheelZoom={true}
        zoomControl={true}
        className="w-full h-full rounded-lg border"
      >
        {/* Capa de OpenStreetMap */}
        <TileLayer url={tileLayerUrl} />
      </MapContainer>
    </div>
  );
}
