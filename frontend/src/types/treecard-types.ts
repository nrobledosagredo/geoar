// treecard-types.ts
export interface TreeCard {
  _id: string
  images: string[]
  commonName: string[]
  binomialName: string
  taxonomy: {
    kingdom: string
    division: string
    class: string
    order: string
    family: string
    genus: string
    species: string
  }
  conservationStatus: {
    acronym: string
    description: string
  }
  isNative: boolean
  origin: string[]
  sector: string[]
  classification: string[]
  annexes: string[]
  representative: {
    _id: string
    name: string
    geometry: {
      type: "Point"
      coordinates: [number, number]
    }
    treeCard: string
  }
}
