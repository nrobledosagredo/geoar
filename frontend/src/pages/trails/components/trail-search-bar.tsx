// trail-search-bar.tsx
import { useState } from "react"
import { TrailSearchForm } from "@/pages/trails/components/trail-search-form"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"

// Props del componente SearchBar
type TrailSearchProps = {
  onSearch: (searchTerm: string) => void
}
export function TrailSearchBar({ onSearch }: TrailSearchProps) {
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
            className="w-full justify-start text-muted-foreground bg-background/50 backdrop-blur-3xl hover:bg-background/75 hover:backdrop-blur-3xl"
          >
            <Search className="h-4 -ml-2 mr-2" />
            {t("search_bar_placeholder")}
          </Button>
        </DialogTrigger>

        {/* Contenido del diálogo de búsqueda */}
        <DialogContent className="rounded-lg">
          <TrailSearchForm onSearch={onSearch} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground bg-background/50 backdrop-blur-3xl hover:bg-background/75 hover:backdrop-blur-3xl"
        >
          <Search className="h-4 -ml-2 mr-2" />
          {t("search_bar_placeholder")}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full">
        <DrawerHeader className="pt-2"></DrawerHeader>
        <TrailSearchForm onSearch={onSearch} />
      </DrawerContent>
    </Drawer>
  )
}
