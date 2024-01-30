// login.tsx
import { useState } from "react"
import { SignInAnonymouslyButton } from "@/pages/auth"
import { LoginForm } from "@/pages/auth/login/login-form"

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
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

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
    </div>
  )
}
