// info-cards-service.js
import i18n from "@/lib/i18n"

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT
const BACKEND_URL = `${BACKEND_HOST}:${BACKEND_PORT}/api`

export const getAllInfoCards = async () => {
  const lang = i18n.language
  const response = await fetch(`${BACKEND_URL}/infoCards?lang=${lang}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export const getInfoCardById = async (id: any) => {
  const lang = i18n.language
  const response = await fetch(`${BACKEND_URL}/infoCard/${id}?lang=${lang}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}
