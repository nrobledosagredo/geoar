// get-auth-token.ts
import { getAuth } from "firebase/auth"

/**
 * @returns {Promise<string>} El token de autenticación
 * @throws {Error} Si no hay ningún usuario autenticado
 */
export async function getAuthToken(): Promise<string> {
  const auth = getAuth()
  const currentUser = auth.currentUser
  if (!currentUser) {
    throw new Error("User not authenticated")
  }
  const token = await currentUser.getIdToken()
  return token
}
