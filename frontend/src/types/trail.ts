// trail.ts
export interface Distance {
  value: number
  unit: string
}

export interface Duration {
  value: number
  unit: string
}

export interface InfoCard {
  _id: string
  order: number
}

export interface Trail {
  distance: Distance
  duration: Duration
  _id: string
  name: string
  description: string
  difficulty: string
  infoCards: InfoCard[]
}
