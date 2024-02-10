import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Esquema de validación con Zod para el término de búsqueda
const SearchSchema = z.object({
  searchTerm: z.string().min(0),
})

// Props del componente SearchBar
type SearchBarProps = {
  onSearch: (searchTerm: string) => void
}
export function SearchBar({ onSearch }: SearchBarProps) {
  const { t } = useTranslation()
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      searchTerm: "",
    },
  })

  // Función para manejar el envío del formulario
  const onSubmit = (data: z.infer<typeof SearchSchema>) => {
    onSearch(data.searchTerm)
  }

  return (
    <Dialog>
      {/* Botón para abrir el diálogo de búsqueda */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground"
        >
          <Search className="h-4 -ml-2 mr-2" />
          {t("search_bar_placeholder")}
        </Button>
      </DialogTrigger>

      {/* Contenido del diálogo de búsqueda */}
      <DialogContent className="rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center">
              {/* Campo de búsqueda */}
              <FormControl className="flex-grow">
                <Input
                  placeholder={t("search_bar_placeholder")}
                  {...form.register("searchTerm")}
                />
              </FormControl>

              {/* Botón para cerrar el diálogo */}
              <DialogClose asChild>
                <Button size="icon" type="submit" className="-ml-[38px] mr-4">
                  <Search className="h-5" />
                  <span className="sr-only">{t("search_bar_label")}</span>
                </Button>
              </DialogClose>
            </div>
            <FormDescription>{t("search_bar_description")}</FormDescription>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
