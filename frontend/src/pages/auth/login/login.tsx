// login.tsx
import { useState } from "react"
import { SignInAnonymouslyButton } from "@/components/sign-in-anonymously-button"
import { LoginForm } from "@/pages/auth/login/components/login-form"

import { LogoVertical } from "@/components/logo-vertical"

export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="max-w-sm mx-auto">
      {/* Logo */}
      <div className="my-8">
        <LogoVertical />
      </div>

      {/* Titulo del formulario */}
      <h1 className="text-xl font-bold text-center mb-2">
        Ingresa con tu cuenta
      </h1>

      <div className="mx-2">
      {/* Formulario de login */}
      <div>
        <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
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

      {/* Enlace a la página de registro */}
      <div className="mt-8 text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <a href="/auth/register" className="underline font-bold">
          Regístrate
        </a>
      </div>
      </div>

      {/* Enlaces a términos de uso y política de privacidad */}
      <div className="mt-8 text-center text-sm">
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
