import { useEffect, useState } from "react"
import { getAuth, User } from "firebase/auth"

export function useUser() {
  // Especificar el tipo de estado como User | null
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser) // currentUser es User | null
    })

    // Limpiar el listener cuando el componente se desmonte
    return unsubscribe
  }, [])

  return user
}
