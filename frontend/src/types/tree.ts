export interface Geometry {
  type: "Point"
  coordinates: [number, number]
}

export interface Tree {
  name: string
  geometry: Geometry
  treeCard?: string
  habilitado: boolean
  updatedAt: Date
}
