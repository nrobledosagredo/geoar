// points-service.ts
import { Point } from "@/types/point"
import { getAuthToken } from "@/lib/get-auth-token"

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT
const BACKEND_URL = `${BACKEND_HOST}:${BACKEND_PORT}/api`

export async function getPoints(trailId: string): Promise<Point[]> {
  const token = await getAuthToken()

  const response = await fetch(`${BACKEND_URL}/points/trails/${trailId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}
