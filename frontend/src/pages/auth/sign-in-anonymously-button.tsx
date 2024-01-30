// sign-in-anonymously-button.tsx
import { getAuth, signInAnonymously } from "firebase/auth"
import { Loader2, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"

export function SignInAnonymouslyButton({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const navigate = useNavigate() // Hook para la navegación
  const handlesignInAnonymously = () => {
    setIsLoading(true)
    const auth = getAuth()
    signInAnonymously(auth)
      .then(() => {
        console.log("Inicio de sesión anónimo exitoso")
        navigate("/")
      })

      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(
          "Error en inicio de sesión anónimo: ",
          errorCode,
          errorMessage
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Button
      variant="secondary"
      className="w-full"
      onClick={handlesignInAnonymously}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <User className="mr-2 h-4 w-4" />
      )}
      Continuar como invitado
    </Button>
  )
}
