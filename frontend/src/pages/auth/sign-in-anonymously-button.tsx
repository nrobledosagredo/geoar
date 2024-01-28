// sign-in-anonymously-button.tsx
import { getAuth, signInAnonymously } from "firebase/auth"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"

export function SignInAnonymouslyButton() {
  const navigate = useNavigate() // Hook para la navegación
  const handlesignInAnonymously = () => {
    const auth = getAuth()
    signInAnonymously(auth)
      .then(() => {
        // El usuario ha iniciado sesión de forma anónima
        console.log("Inicio de sesión anónimo exitoso")
        navigate("/") // Redirige al usuario a la página de inicio
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error("Error en inicio de sesión anónimo: ", errorMessage)
      })
  }

  return (
    <Button onClick={handlesignInAnonymously}>Continuar como invitado</Button>
  )
}