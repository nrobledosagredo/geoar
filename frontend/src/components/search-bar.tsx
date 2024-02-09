import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export function SearchBar() {
  return (
    <Dialog>
      {/* Botón que abre el diálogo de búsqueda */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground"
        >
          <Search className="h-4 -ml-2 mr-2" />
          Buscar senderos...
        </Button>
      </DialogTrigger>

      {/* Diálogo de búsqueda */}
      <DialogContent className="sm:max-w-md">
        {/* Header del diálogo */}
        <DialogHeader>
          <DialogTitle>Busca senderos</DialogTitle>
          <DialogDescription>
            Filtra la búsqueda por palabras clave
          </DialogDescription>
        </DialogHeader>

        {/* Contenido del diálogo */}
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label className="sr-only">
              SearchBar
            </Label>
            <Input
              placeholder="Buscar senderos..."
            ></Input>
          </div>

          {/* Botón de búsqueda */}
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Search</span>
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
