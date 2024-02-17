// info-cards-service.ts
import { InfoCard } from "@/types/infocard-types"
import { getAuthToken } from "@/lib/get-auth-token"
import i18n from "@/lib/i18n"

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT
const BACKEND_URL = `${BACKEND_HOST}:${BACKEND_PORT}/api`

export async function getInfoCards(): Promise<InfoCard[]> {
  const lang = i18n.language
  const token = await getAuthToken()

  const response = await fetch(`${BACKEND_URL}/infocards?lang=${lang}`, {
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

export async function getInfoCard(id: string): Promise<InfoCard> {
  const lang = i18n.language
  const token = await getAuthToken()

  const response = await fetch(`${BACKEND_URL}/infocards/${id}?lang=${lang}`, {
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
