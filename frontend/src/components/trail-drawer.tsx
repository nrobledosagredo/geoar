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
      <DrawerContent className="px-4">
        <ScrollArea>
          <DrawerHeader>
            <TrailMap />
            <TrailDetails trail={trail} />
            <DrawerTitle>{trail.name}</DrawerTitle>
            <DrawerDescription>{trail.description}</DrawerDescription>
          </DrawerHeader>

          {/* Botones de acción */}
          <DrawerFooter className="flex flex-row justify-center">
            <DrawerClose>
              <Button variant="destructive" className="w-24">
                Cerrar
              </Button>
            </DrawerClose>
            
            <Button className="w-24 font-semibold">Comenzar</Button>
          </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
