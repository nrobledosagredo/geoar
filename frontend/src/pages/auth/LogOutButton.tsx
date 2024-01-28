// LogOutButton.tsx
import { auth } from "@/pages/auth"
import { signOut } from "firebase/auth"
import { LogOut } from "lucide-react"

export const LogOutButton = () => {
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Deslogueo exitoso
      })
      .catch((error) => {
        // Manejar errores
        console.error("Error al cerrar sesión: ", error)
      })
  }

  return (
    <button onClick={handleLogOut}>
      <LogOut />
    </button>
  )
}
