// point.ts
export interface Point {
  trailId: string
  order: number
  geometry: {
    type: "Point"
    coordinates: [number, number] // [longitud, latitud]
  }
}
