// users-service.ts
import { getAuth } from "firebase/auth"

import { User } from "@/types/user-types"

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT
const BACKEND_URL = `${BACKEND_HOST}:${BACKEND_PORT}/api`

export async function createUser(user: User): Promise<any> {
  try {
    const auth = getAuth()
    const currentUser = auth.currentUser
    if (!currentUser) {
      throw new Error("User not authenticated")
    }
    const token = await currentUser.getIdToken()

    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    return response.json()
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

//TODO export async function getUser(userId: string): Promise<any> {

//TODO export async function updateUser(user: User): Promise<any> {
