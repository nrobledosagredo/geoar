import L from "leaflet"

import tree from "/icons/markerIcons/g0.png"
import infoCard from "/icons/markerIcons/r0.png"

// Íconos
export const infoCardIcon: L.Icon = new L.Icon({
  iconUrl: infoCard,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [1, -24],
})

export const treeIcon: L.Icon = new L.Icon({
  iconUrl: tree,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
})

// Configuración de MapPathLayer
export const primaryPathOptions: any = {
  delay: 600,
  dashArray: [7],
  weight: 3,
  color: "none",
  pulseColor: "#22c55e",
  opacity: 1,
  paused: false,
  reverse: false,
  className: "opacity-50",
  hardwareAccelerated: true,
}

// Configuración de MapPathLayer
export const secondaryPathOptions: any = {
  delay: 600,
  dashArray: [7],
  weight: 3,
  color: "none",
  pulseColor: "white",
  opacity: 0.2,
  paused: false,
  reverse: false,
  hardwareAccelerated: true,
}
