// trail-drawer.tsx
import { TrailDetails } from "@/pages/trails/components/trail-details"
import { TrailMap } from "@/pages/trails/components/trail-map"
import { useNavigate } from "react-router-dom"

import { TrailWithInfoCards } from "@/types/trail-with-infocards"
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

export function TrailDrawer({ trail }: { trail: TrailWithInfoCards }) {
  const navigate = useNavigate()
  return (
    <Drawer>
      <DrawerTrigger asChild className="w-full">
        <Button className="w-full font-semibold">Ver más detalles</Button>
      </DrawerTrigger>
      <DrawerContent className="h-auto max-h-screen overflow-hidden">
        <DrawerHeader>
          <DrawerTitle>{trail.name}</DrawerTitle>
        </DrawerHeader>

        <ScrollArea className="max-h-[calc(100vh-10rem)] overflow-auto">
          <div className="space-y-4 mx-4">
            <TrailMap trail={trail} />
            <TrailDetails trail={trail} />
            <DrawerDescription className="text-justify">
              {trail.description}
            </DrawerDescription>
          </div>
        </ScrollArea>

        {/* Botones de acción */}
        <DrawerFooter className="flex flex-row justify-center">
          <DrawerClose asChild>
            <Button variant="destructive" className="w-24">
              Cerrar
            </Button>
          </DrawerClose>

          <Button
            onClick={() => navigate(`/trails/${trail._id}`)}
            className="w-24 font-semibold"
          >
            Comenzar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
