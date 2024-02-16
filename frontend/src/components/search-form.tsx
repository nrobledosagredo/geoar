import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { DrawerClose } from "@/components/ui/drawer"
import { Form, FormControl, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Esquema de validación con Zod para el término de búsqueda
const SearchSchema = z.object({
  searchTerm: z.string().min(0),
})

// Props del componente SearchBar
type SearchProps = {
  onSearch: (searchTerm: string) => void
}
export function SearchForm({ onSearch }: SearchProps) {
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 ml-4 md:ml-0"
      >
        <div className="flex items-center">
          {/* Campo de búsqueda */}
          <FormControl className="flex-grow">
            <Input
              placeholder={t("search_bar_placeholder")}
              {...form.register("searchTerm")}
            />
          </FormControl>

          {/* Botón para cerrar el diálogo */}
          <DrawerClose asChild>
            <Button size="icon" type="submit" className="-ml-[38px] mr-4">
              <Search className="h-5" />
              <span className="sr-only">{t("search_bar_label")}</span>
            </Button>
          </DrawerClose>
        </div>
        <FormDescription>{t("search_bar_description")}</FormDescription>
      </form>
    </Form>
  )
}
