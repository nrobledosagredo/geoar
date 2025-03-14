// sign-in-with-google-button.tsx
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useCreateUser } from "@/hooks/use-create-user"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function SignInWithGoogleButton({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { handleCreateUser } = useCreateUser()
  const { toast } = useToast()
  const { t, i18n } = useTranslation()

  function handleSignInWithGoogle() {
    setIsLoading(true)
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        toast({
          description: t("google_toast"),
        })
        return handleCreateUser({
          userId: result.user.uid,
          language: i18n.language,
        })
      })
      .catch((error) => {
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
      variant="secondary"
      className="w-full font-semibold"
      onClick={handleSignInWithGoogle}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <svg role="img" viewBox="0 0 24 24" className="mr-2 h-3 w-3">
          <path
            fill="currentColor"
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          />
        </svg>
      )}
      {t("google_button")}
    </Button>
  )
}
