// login.tsx
import { useState } from "react"
import { RegisterForm } from "@/pages/auth/register/components/register-form"

import { LogoVertical } from "@/components/logo-vertical"
import { SignInAnonymouslyButton } from "@/components/sign-in-anonymously-button"

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="max-w-sm mx-auto">
      {/* Logo */}
      <div className="my-8">
        <LogoVertical />
      </div>

        {/* Titulo del formulario */}
        <h1 className="text-xl font-bold text-center mb-2">Crea una cuenta</h1>

      <div className="mx-2">
        {/* Formulario de registro */}
        <div>
          <RegisterForm isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>

        {/* Separador */}
        <div className="relative mt-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-2" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">O</span>
          </div>
        </div>

        {/* Botón de login anónimo */}
        <div className="mt-8">
          <SignInAnonymouslyButton
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        </div>

        {/* Enlace a la página de login */}
        <div className="mt-8 text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a href="/auth/login" className="underline font-bold">
            Iniciar sesión
          </a>
        </div>

      {/* Enlaces a términos de uso y política de privacidad */}
      <div className="mt-12 mb-2 text-center text-sm">
        <a href="/terms-of-uso" className="underline mr-2">
          Términos de uso
        </a>
        |
        <a href="/privacy-policy" className="underline ml-2">
          Política de privacidad
        </a>
      </div>
    </div>
  )
}
