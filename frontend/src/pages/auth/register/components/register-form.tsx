// login-form.tsx
import { registerSchema } from "@/pages/auth/register/components/register-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, Locale } from "date-fns"
import { enUS, es } from "date-fns/locale"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"

import { auth } from "@/lib/firebase-config"
import { cn } from "@/lib/utils"
import { useCreateUser } from "@/hooks/use-create-user"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"

export function RegisterForm({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { t, i18n } = useTranslation()
  const { handleCreateUser } = useCreateUser()
  const { toast } = useToast()

  // Configura el mapa de errores de Zod para que use i18n
  z.setErrorMap(makeZodI18nMap({ t, handlePath: { ns: ["common", "zod"] } }))

  // Mapeo de códigos de idioma i18next a locales de date-fns
  const locales: { [key: string]: Locale } = {
    en: enUS,
    es: es,
  }

  // Obtiene el locale de date-fns basado en el idioma actual de i18next
  const currentLocale = locales[i18n.language] || locales.es

  // Hook de react-hook-form para manejar formularios en React
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Función para manejar el envío del formulario
  function onSubmit(data: z.infer<typeof registerSchema>) {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((result) => {
        toast({
          description: t("register_toast"),
        })
        handleCreateUser({
          userId: result.user.uid,
          dob: data.dob,
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
                  {t("register_email_label")}{" "}
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="email"
                    placeholder={t("register_email_placeholder")}
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
                  {t("register_password_label")}{" "}
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder={t("register_password_placeholder")}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          {/* Fecha de nacimiento */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  {t("register_dob_label")}{" "}
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: currentLocale })
                        ) : (
                          <span>{t("register_dob_placeholder")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={currentLocale}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      captionLayout="dropdown-buttons"
                      fromYear={1900}
                      toYear={2024}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  {t("register_dob_description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormControl>
            {/* Botón para registrarse */}
            <Button
              type="submit"
              className="w-full font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {t("register_button")}
            </Button>
          </FormControl>
        </form>
      </Form>
    </div>
  )
}
