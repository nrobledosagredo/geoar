// trail-drawer.tsx
import { TrailDetails } from "@/pages/trails/components/trail-details"
import { TrailMap } from "@/pages/trails/components/trail-map"
import { Link } from "react-router-dom"

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
  return (
    <Drawer>
      <DrawerTrigger asChild className="w-full">
        <Button className="w-full font-semibold">Ver más detalles</Button>
      </DrawerTrigger>
      <DrawerContent className="h-auto max-h-screen overflow-hidden">
        <DrawerHeader className="justify-center">
          <DrawerTitle>{trail.name}</DrawerTitle>
        </DrawerHeader>

        <ScrollArea className="max-h-[calc(100vh-10rem)] overflow-auto">
          <div className="space-y-6 mx-4">
            <TrailMap trail={trail} />
            <TrailDetails trail={trail} />
            <DrawerDescription className="text-justify">
              {trail.description}
            </DrawerDescription>
          </div>
        </ScrollArea>

        {/*}
        <ScrollArea className="max-h-[calc(100vh-10rem)] overflow-auto">
          <div className="mx-4 lg:flex lg:space-y-0 lg:space-x-4">
            <div className="lg:flex-shrink-0 lg:w-1/2 mb-4 lg:mb-0">
              <TrailMap trail={trail} />
            </div>
            <div className="lg:w-1/2">
              <TrailDetails trail={trail} />
              <DrawerDescription className="text-justify mt-4">
                {trail.description}
              </DrawerDescription>
            </div>
          </div>
        </ScrollArea>
        */}

        {/* Botones de acción */}
        <DrawerFooter className="flex flex-row justify-center">
          <DrawerClose asChild>
            <Button variant="destructive" className="w-24">
              Cerrar
            </Button>
          </DrawerClose>

          <Button className="w-24 font-semibold">
            <Link to={`/trails/${trail._id}`} className="block w-full h-full">
              Comenzar
            </Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
