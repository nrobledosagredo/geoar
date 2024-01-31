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
      <div className="my-20">
        <LogoVertical />
      </div>

      {/* Titulo del formulario */}
      <h1 className="text-xl font-bold text-center mb-4">
        Ingresa con tu cuenta
      </h1>

      {/* Formulario de login */}
      <div>
        <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>

      {/* Separador */}
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">O</span>
        </div>
      </div>

      {/* Botón de login anónimo */}
      <div className="mt-6">
        <SignInAnonymouslyButton
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>

      {/* Enlace a la página de registro */}
      <div className="mt-6 text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <a href="/auth/register" className="underline">
          Regístrate
        </a>
      </div>

      {/* Enlaces a Términos de uso y Política de privacidad */}
      <div className="mt-6 text-center text-sm">
        <a href="/terms-of-uso" className="underline mr-4">
          Términos de uso
        </a>
        |
        <a href="/privacy-policy" className="underline ml-4">
          Política de privacidad
        </a>
      </div>
    </div>
  )
}
