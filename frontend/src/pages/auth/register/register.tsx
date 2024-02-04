// login.tsx
import { useState } from "react"
import { RegisterForm } from "@/pages/auth/register/components/register-form"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { LogoVertical } from "@/components/logo-vertical"
import { SignInAnonymouslyButton } from "@/components/sign-in-anonymously-button"

export function Register() {
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
          <h1 className="text-2xl font-semibold text-center">
            {t("register_title")}
          </h1>
          <p className="mt-2 mx-8 mb-4 text-sm text-muted-foreground">
            {t("register_description")}
          </p>
        </div>

        <div className="mx-12">
          {/* Formulario de registro */}
          <div>
            <RegisterForm isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>

          {/* Enlace a la página de login */}
          <div className="mt-4 text-center text-sm">
            {t("already_have_account")}{" "}
            <Link to="/auth/login" className="underline font-bold text-primary">
              {t("login")}
            </Link>
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
          <Link to="/terms-of-use" className="underline mr-2">
            {t("terms_of_use")}
          </Link>
          |
          <Link to="/privacy-policy" className="underline ml-2">
            {t("privacy_policy")}
          </Link>
        </div>
      </div>
    </div>
  )
}
