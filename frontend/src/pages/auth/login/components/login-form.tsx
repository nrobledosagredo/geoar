// login-form.tsx
import { useEffect } from "react"
import { loginSchema } from "@/pages/auth/login/components/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

import { auth } from "@/lib/firebase"
import { getErrorMessage } from "@/lib/get-error-message"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "react-i18next";
import { makeZodI18nMap } from "zod-i18n-map";

export function LoginForm({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { t, i18n } = useTranslation()


  useEffect(() => {
    const zodI18nMap = makeZodI18nMap({ t, ns: "zod" });
    z.setErrorMap(zodI18nMap);
  }, [t, i18n.language]);


  // Hook de react-hook-form para manejar formularios en React
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Función para manejar el envío del formulario
  function onSubmit(data: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/")
        toast({
          description: "Has iniciado sesión exitosamente.",
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
    <div>
      {/* Formulario de login */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-sm mx-auto space-y-4"
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="email"
                    placeholder="Ejemplo@correo.com"
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="font-semibold">Contraseña</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder="Contraseña"
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormControl>
            {/* Boton para logearse */}
            <Button
              type="submit"
              className="w-full font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Iniciar sesión
            </Button>
          </FormControl>
        </form>
      </Form>
    </div>
  )
}
