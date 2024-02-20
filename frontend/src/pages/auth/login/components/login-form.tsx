// login-form.tsx
import { loginSchema } from "@/pages/auth/login/components/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"

import { auth } from "@/lib/firebase-config"
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

export function LoginForm({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { t } = useTranslation()

  // Configura el mapa de errores de Zod para que use i18n
  z.setErrorMap(makeZodI18nMap({ t, handlePath: { ns: ["common", "zod"] } }))

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
          description: t("login_toast"),
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
                <FormLabel className="font-semibold">
                  {t("login_email_label")}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="email"
                    placeholder={t("login_email_placeholder")}
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
                <FormLabel className="font-semibold">
                  {t("login_password_label")}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder={t("login_password_placeholder")}
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
              {t("login_button")}
            </Button>
          </FormControl>
        </form>
      </Form>
    </div>
  )
}
