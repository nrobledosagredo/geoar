// scene-types.ts

// Definición de tipos para Point
export interface PointProps {
  latitude: number
  longitude: number
  order: number
}

// Definición de tipos para Circle
export interface CircleProps {
  latitude: number
  longitude: number
  scale: number
  yPosition: number
  image: string
  color: string
  isExpanded: any
  handleToggleClick: any
}

// Definición de tipos para InfoCard
export interface InfoCardProps {
  id: string
  name: string
  description: string
  image: string
  latitude: number
  longitude: number
}

// Definición de tipos para TreeCard
export interface Taxonomy {
  kingdom: string
  division: string
  class: string
  order: string
  family: string
  genus: string
  species: string
}

export interface ConservationStatus {
  acronym: string
  description: string
}

export interface TreeCardProps {
  name: string
  taxonomy: Taxonomy
  conservationStatus: ConservationStatus
  image: string
  latitude: number
  longitude: number
}
