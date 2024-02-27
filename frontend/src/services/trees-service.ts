// trees-service.ts
import { Tree } from "@/types/tree-types"
import { getAuthToken } from "@/lib/get-auth-token"

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT
//const BACKEND_URL = `${BACKEND_HOST}:${BACKEND_PORT}/api`
const BACKEND_URL = `${BACKEND_HOST}/api`

// Retorna los árboles habilitados
export async function getTrees(): Promise<Tree[]> {
  const token = await getAuthToken()

  const response = await fetch(`${BACKEND_URL}/trees?enabled=true`, {
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
