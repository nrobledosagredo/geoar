// tree-types.ts
export interface Geometry {
  type: "Point"
  coordinates: [number, number]
}

export interface Tree {
  _id: string
  name: string
  geometry: Geometry
  treeCard: string
  habilitado: boolean
  updatedAt: Date
}
