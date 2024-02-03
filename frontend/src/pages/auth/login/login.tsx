// login.tsx
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { LoginForm } from "@/pages/auth/login/components/login-form"

import { LogoVertical } from "@/components/logo-vertical"
import { SignInAnonymouslyButton } from "@/components/sign-in-anonymously-button"

export function Login() {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="flex flex-col min-h-screen max-w-sm mx-auto">
      {/* Logo */}
      <div className="flex flex-grow items-center justify-center">
        <LogoVertical />
      </div>

      {/* Titulo del formulario */}
      <div className="flex-col flex-grow">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">{t("login_title")}</h1>
          <p className="mt-2 mx-8 mb-4 text-sm text-muted-foreground">
          {t("login_description")}
          </p>
        </div>

        <div className="mx-12">
          {/* Formulario de login */}
          <div>
            <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>

          {/* Enlace a la página de registro */}
          <div className="mt-4 text-center text-sm">
            {t("no_account")}{" "}
            <a
              href="/auth/register"
              className="underline font-bold text-primary"
            >
              {t("register")}
            </a>
          </div>

          {/* Separador */}
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-1" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("or")}
              </span>
            </div>
          </div>

          {/* Botón de login anónimo */}
          <div className="mt-4">
            <SignInAnonymouslyButton
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </div>

      {/* Enlaces a términos de uso y política de privacidad */}
      <div className="my-2 w-full">
        <div className="text-center text-sm text-muted-foreground">
          <a href="/terms-of-uso" className="underline mr-2">
            {t("terms_of_use")}
          </a>
          |
          <a href="/privacy-policy" className="underline ml-2">
            {t("privacy_policy")}
          </a>
        </div>
      </div>
    </div>
  )
}
