import { useState } from "react"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SearchForm } from "@/components/search-form"

// Props del componente SearchBar
type SearchProps = {
  onSearch: (searchTerm: string) => void
}
export function SearchBar({ onSearch }: SearchProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
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
          <SearchForm onSearch={onSearch} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground"
        >
          <Search className="h-4 -ml-2 mr-2" />
          {t("search_bar_placeholder")}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="pt-2"></DrawerHeader>
        <SearchForm onSearch={onSearch} />
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
