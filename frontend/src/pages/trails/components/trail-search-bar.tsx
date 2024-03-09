// trail-search-bar.tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { Search, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Esquema de validación con Zod para el término de búsqueda
const SearchSchema = z.object({
  searchTerm: z.string().min(0),
})

// Props del componente SearchBar
type TrailSearchProps = {
  onSearch: (searchTerm: string) => void
}
export function TrailSearchBar({ onSearch }: TrailSearchProps) {
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
  const searchTerm = form.watch("searchTerm")

  const resetSearch = () => {
    form.setValue("searchTerm", "")
    form.handleSubmit(onSubmit)()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex">
          <Button
            variant="ghost"
            size="icon"
            type="submit"
            className="z-[1000] -mr-[38px] text-muted-foreground hover:text-primary bg-transparent hover:bg-transparent"
          >
            <Search className="h-4" />
          </Button>
          {/* Campo de búsqueda */}
          <FormControl className="flex-grow">
            <Input
              type="search"
              placeholder={t("search_bar_placeholder")}
              {...form.register("searchTerm")}
              className="text-md pl-9 pt-[7px]"
              autoFocus
            />
          </FormControl>
          <Button
            variant="ghost"
            size="icon"
            type="submit"
            className={`-ml-[38px] mr-4 text-muted-foreground hover:text-destructive bg-transparent hover:bg-transparent ${searchTerm ? "" : "invisible"}`}
            onClick={resetSearch}
          >
            <X className="h-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}
