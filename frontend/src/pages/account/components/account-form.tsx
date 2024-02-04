import { zodResolver } from "@hookform/resolvers/zod"
import { format, Locale } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/hooks/use-language"
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
import { accountSchema } from "@/pages/account/components/account-schema"
import { useTranslation } from "react-i18next"
import { makeZodI18nMap } from "zod-i18n-map"
import { enUS, es } from "date-fns/locale"

type AccountFormValues = z.infer<typeof accountSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}

export function AccountForm() {
  // Lógica para cambiar el idioma de la aplicación
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

  // Obtener el locale de date-fns basado en el idioma actual de i18next
  const currentLocale = locales[i18n.language] || locales.en // 'en' como fallback

  // Lógica del formulario
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    toast({
      title: t("account_toast"),
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
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
                <FormDescription>
                  {t("register_dob_description")}
                </FormDescription>
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
                  // Cambia el idioma de la aplicación
                  changeLanguage(value)
                }}
                defaultValue={language}
              >
                <FormControl>
                  <SelectTrigger className="w-[240px] pl-3 text-left font-normal">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="es">
                    {t("account_language_es")}
                  </SelectItem>
                  <SelectItem value="en">
                    {t("account_language_en")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {t("account_language_description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="font-semibold">
          {t("account_button")}
        </Button>
      </form>
    </Form>
  )
}
