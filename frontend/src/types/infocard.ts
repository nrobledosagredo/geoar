export interface Geometry {
  type: "Point"
  coordinates: [number, number]
}

export interface InfoCard {
  _id: string
  geometry: Geometry
  name: string
  description: string
  images: string[]
}
