import L from "leaflet"

import arrowIconImg from "/icons/arrow.png"
import treeIconImg from "/icons/markerIcons/g0.png"
import infoCardIconImg from "/icons/markerIcons/r0.png"

export const userIcon: L.Icon = new L.Icon({
  iconUrl: arrowIconImg,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

export const infoCardIcon: L.Icon = new L.Icon({
  iconUrl: infoCardIconImg,
  iconSize: [24, 24],
  iconAnchor: [8, 24],
  popupAnchor: [1, -34],
})

export const treeIcon: L.Icon = new L.Icon({
  iconUrl: treeIconImg,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
})

interface PathOptions {
  delay: number
  dashArray: [number, number]
  weight: number
  color: string
  pulseColor: string
  paused: boolean
  reverse: boolean
  hardwareAccelerated: boolean
}

// Opciones de MapPathLayer
export const primaryPathOptions: PathOptions = {
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
export const secondaryPathOptions: PathOptions = {
  delay: 500,
  dashArray: [10, 30],
  weight: 5,
  color: "#020617",
  pulseColor: "#fff7ed",
  paused: false,
  reverse: false,
  hardwareAccelerated: false,
}
