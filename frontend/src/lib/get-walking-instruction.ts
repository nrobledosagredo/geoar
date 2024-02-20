// get-walking-instruction.ts

// Función que calcula la distancia entre dos puntos en coordenadas geográficas
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3 // meters (earth's radius)
  const φ1 = (lat1 * Math.PI) / 180 // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // En metros
}

// Función que calcula el rumbo (bearing) entre dos puntos en coordenadas geográficas
export function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  lat1 = (lat1 * Math.PI) / 180
  lat2 = (lat2 * Math.PI) / 180
  const Δlon = ((lon2 - lon1) * Math.PI) / 180

  const y = Math.sin(Δlon) * Math.cos(lat2)
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(Δlon)
  const brng = (Math.atan2(y, x) * 180) / Math.PI

  return (brng + 360) % 360
}

// Función que devuelve la dirección cardinal (Norte, Noreste, Este, Sureste, Sur, Suroeste, Oeste, Noroeste) a partir de un rumbo (bearing)
export function getCardinalDirection(bearing: number): string {
  const directions = [
    "North",
    "Northeast",
    "East",
    "Southeast",
    "South",
    "Southwest",
    "West",
    "Northwest",
  ]

  return directions[
    Math.round(((bearing %= 360) < 0 ? bearing + 360 : bearing) / 45) % 8
  ]
}

// Función que devuelve una instrucción de navegación a pie entre dos puntos en coordenadas geográficas
export function getWalkingInstruction(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): [string, string] {
  const distance = calculateDistance(lat1, lon1, lat2, lon2)
  const bearing = calculateBearing(lat1, lon1, lat2, lon2)
  const direction = getCardinalDirection(bearing)

  return [direction, distance.toFixed(0)]
}
