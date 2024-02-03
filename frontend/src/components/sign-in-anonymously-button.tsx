// sign-in-anonymously-button.tsx
import { getAuth, signInAnonymously } from "firebase/auth"
import { Loader2, User } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { getErrorMessage } from "@/lib/get-error-message"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function SignInAnonymouslyButton({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { t } = useTranslation()
  const handlesignInAnonymously = () => {
    setIsLoading(true)
    const auth = getAuth()
    signInAnonymously(auth)
      .then(() => {
        navigate("/")
        toast({
          description: t("login_success"),
        })
      })

      .catch((error) => {
        console.error(error.message)
        const errorMessage = getErrorMessage(error.code)
        toast({
          description: errorMessage,
          variant: "destructive",
        })
      })

      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Button
      variant="outline"
      className="w-full font-semibold"
      onClick={handlesignInAnonymously}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <User className="mr-2 h-4 w-4" />
      )}
      {t("guest_button")}
    </Button>
  )
}
