// interaction-types.ts
interface Geometry {
  type: "Point"
  coordinates: [number, number]
}

export interface Interaction {
  userId: string
  trailId: string
  cardId: string
  cardType: string
  geometry: Geometry
}
