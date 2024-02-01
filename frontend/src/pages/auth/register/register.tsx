// login.tsx
import { useState } from "react"
import { RegisterForm } from "@/pages/auth/register/components/register-form"

import { LogoVertical } from "@/components/logo-vertical"
import { SignInAnonymouslyButton } from "@/components/sign-in-anonymously-button"

export function Register() {
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
            Crea una cuenta
          </h1>
          <p className="mt-2 mx-8 mb-4 text-sm text-muted-foreground">
            Rellena el formulario para crear una cuenta
          </p>
        </div>

        <div className="mx-12">
          {/* Formulario de registro */}
          <div>
            <RegisterForm isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>

                 {/* Enlace a la página de login */}
        <div className="mt-4 text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a href="/auth/login" className="underline font-bold text-primary">
            Iniciar sesión
          </a>
        </div>

          {/* Separador */}
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-1" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O
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
      <div className="mb-2 w-full">
        <div className="text-center text-sm text-muted-foreground">
          <a href="/terms-of-uso" className="underline mr-2">
            Términos de uso
          </a>
          |
          <a href="/privacy-policy" className="underline ml-2">
            Política de privacidad
          </a>
        </div>
      </div>
    </div>
  )
}
