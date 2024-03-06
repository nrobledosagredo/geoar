import { useEffect } from "react"
import { accountSchema } from "@/pages/account/components/account-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, Locale } from "date-fns"
import { enUS, es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"

import { cn } from "@/lib/utils"
import { useGetUser } from "@/hooks/use-get-user"
import { useLanguage } from "@/hooks/use-language"
import { useUpdateUser } from "@/hooks/use-update-user"
import { useUser } from "@/hooks/use-user"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

type AccountFormValues = z.infer<typeof accountSchema>

export function AccountForm() {
  const user = useUser()
  const userID = user?.uid
  const isAnonymous = user?.isAnonymous || false
  const {
    user: userAccount,
    loading: userLoading,
    error: userError,
  } = useGetUser(userID || "")
  const {
    handleUpdateUser,
    loading: updateLoading,
    error: updateError,
  } = useUpdateUser()

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
  }

  // Configura el mapa de errores de Zod para que use i18n
  z.setErrorMap(makeZodI18nMap({ t, handlePath: { ns: ["common", "zod"] } }))

  // Mapeo de códigos de idioma i18next a locales de date-fns
  const locales: { [key: string]: Locale } = {
    en: enUS,
    es: es,
  }

  // Obtiene el locale de date-fns basado en el idioma actual de i18next
  const currentLocale = locales[i18n.language] || locales.en // 'en' como fallback

  // Lógica del formulario
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
  })

  // Actualiza los valores del formulario cuando cambian los datos del usuario
  useEffect(() => {
    if (userAccount) {
      form.reset({
        ...form.getValues(),
        dob: userAccount.dob ? new Date(userAccount.dob) : undefined,
        language: userAccount.language,
      })
    }
  }, [userAccount, form])

  async function onSubmit(data: AccountFormValues) {
    await handleUpdateUser(userID || "", data)
    if (!updateError) {
      changeLanguage(data.language)
      toast({
        description: t("account_toast"),
      })
      navigate(-1)
    }
  }

  const loading = userLoading || updateLoading

  const error = userError || updateError
  if (error) {
    toast({
      title: t("Error"),
      description: userError,
      variant: "destructive",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Fecha de nacimiento */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold">
                {t("account_dob_label")}
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={isAnonymous || loading}
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: currentLocale })
                      ) : (
                        <span>{t("account_dob_placeholder")}</span>
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
              <FormDescription>{t("account_dob_description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold">
                {t("account_language_label")}
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  // Actualiza el valor del formulario
                  field.onChange(value)
                }}
                defaultValue={language}
              >
                <FormControl>
                  <SelectTrigger
                    disabled={loading}
                    className="w-[240px] pl-3 text-left font-normal"
                  >
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="es">{t("account_language_es")}</SelectItem>
                  <SelectItem value="en">{t("account_language_en")}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {t("account_language_description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="font-semibold">
          {t("account_button")}
        </Button>
      </form>
    </Form>
  )
}
