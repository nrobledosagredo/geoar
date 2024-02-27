// trails-service.ts
import { Trail } from "@/types/trail-types"
import { getAuthToken } from "@/lib/get-auth-token"
import i18n from "@/lib/i18n"

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT
//const BACKEND_URL = `${BACKEND_HOST}:${BACKEND_PORT}/api`
const BACKEND_URL = `${BACKEND_HOST}/api`

export async function getTrails(): Promise<Trail[]> {
  const lang = i18n.language
  const token = await getAuthToken()

  const response = await fetch(`${BACKEND_URL}/trails?lang=${lang}`, {
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

export async function getTrail(id: string): Promise<Trail> {
  const lang = i18n.language
  const token = await getAuthToken()

  const response = await fetch(`${BACKEND_URL}/trails/${id}?lang=${lang}`, {
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
