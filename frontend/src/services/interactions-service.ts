// interactions-service.ts
import { getAuth } from "firebase/auth"

import { Interaction } from "@/types/interaction-types"

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST
//const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT
//const BACKEND_URL = `${BACKEND_HOST}:${BACKEND_PORT}/api`
const BACKEND_URL = `${BACKEND_HOST}/api`

export async function createInteraction(
  interaction: Interaction
): Promise<any> {
  try {
    const auth = getAuth()
    const currentUser = auth.currentUser
    if (!currentUser) {
      throw new Error("User not authenticated")
    }
    const token = await currentUser.getIdToken()

    const response = await fetch(`${BACKEND_URL}/interactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(interaction),
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    return response.json()
  } catch (error) {
    console.error("Error creating interaction:", error)
    throw error
  }
}
