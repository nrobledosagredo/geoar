// trail-drawer.tsx
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrailDetails } from "@/components/trail-details"
import { TrailMap } from "@/components/trail-map"

export function TrailDrawer({ trail }: { trail: any }) {
  return (
    <Drawer>
      <DrawerTrigger className="w-full mt-4">
        <Button className="w-full font-semibold">Ver más detalles</Button>
      </DrawerTrigger>
      <DrawerContent className="h-full">
        <DrawerHeader>
          <DrawerTitle>{trail.name}</DrawerTitle>
        </DrawerHeader>

        <ScrollArea>
          <div className="space-y-6 mx-4">
            <TrailMap />
            <TrailDetails trail={trail} />
            <DrawerDescription className="text-justify">
              {trail.description}
            </DrawerDescription>
          </div>
        </ScrollArea>

        {/* Botones de acción */}
        <DrawerFooter className="flex flex-row justify-center">
          <DrawerClose>
            <Button variant="destructive" className="w-24">
              Cerrar
            </Button>
          </DrawerClose>

          <Button className="w-24 font-semibold">Comenzar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
