// trail-types.ts
interface Distance {
  value: number
  unit: string
}

interface Duration {
  value: number
  unit: string
}

interface Geometry {
  type: "Point";
  coordinates: [number, number];
}

interface InfoCard {
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

export interface TrailExtended {
  distance: Distance;
  duration: Duration;
  _id: string;
  name: string;
  description: string;
  difficulty: string;
  infoCards: {
    _id: string;
    order: number;
    geometry: Geometry;
    name: string;
    description: string;
    images: string[];
  }[];
}