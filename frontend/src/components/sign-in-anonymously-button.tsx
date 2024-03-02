// sign-in-anonymously-button.tsx
import { getAuth, signInAnonymously } from "firebase/auth"
import { Loader2, User } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useCreateUser } from "@/hooks/use-create-user"
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
  const { handleCreateUser } = useCreateUser()
  const { toast } = useToast()
  const { t, i18n } = useTranslation()

  function handlesignInAnonymously() {
    setIsLoading(true)
    const auth = getAuth()

    signInAnonymously(auth)
      .then((result) => {
        return handleCreateUser({
          userId: result.user.uid,
          language: i18n.language,
        })
      })
      .then(() => {
        toast({
          description: t("guest_toast"),
        })
        navigate("/")
      })
      .catch((error) => {
        //console.error(error);
        toast({
          description: t(error.code, { defaultValue: t("auth/default-error") }),
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
