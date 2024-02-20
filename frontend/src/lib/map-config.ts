import L from "leaflet"

import tree from "/icons/markerIcons/g0.png"
import infoCard from "/icons/markerIcons/r0.png"

export const infoCardIcon: L.Icon = new L.Icon({
  iconUrl: infoCard,
  iconSize: [24, 24],
  iconAnchor: [8, 24],
  popupAnchor: [1, -34],
})

export const treeIcon: L.Icon = new L.Icon({
  iconUrl: tree,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
})

// Opciones de MapPathLayer
export const primaryPathOptions: any = {
  delay: 500,
  dashArray: [10, 30],
  weight: 5,
  color: "#16a34a",
  pulseColor: "#052e16",
  paused: false,
  reverse: false,
  hardwareAccelerated: false,
}

// Opciones de MapPathLayer
export const secondaryPathOptions: any = {
  delay: 500,
  dashArray: [10, 30],
  weight: 5,
  color: "#020617",
  pulseColor: "#fff7ed",
  paused: false,
  reverse: false,
  hardwareAccelerated: false,
}
