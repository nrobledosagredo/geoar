// trail-drawer.tsx
import { TrailDetails } from "@/pages/trails/components/trail-details"
import { TrailMap } from "@/pages/trails/components/trail-map"
import { useTranslation } from "react-i18next"

import { TrailExtended } from "@/types/trail-types"
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

export function TrailDrawer({ trail }: { trail: TrailExtended }) {
  const { t } = useTranslation()
  return (
    <Drawer>
      <DrawerTrigger asChild className="w-full">
        <Button className="w-full font-semibold"> {t("details_button")}</Button>
      </DrawerTrigger>
      <DrawerContent className="h-auto max-h-[99%] overflow-hidden">
        <DrawerHeader className="justify-center">
          <DrawerTitle>{trail.name}</DrawerTitle>
        </DrawerHeader>

        {/* Contenido del drawer
        <ScrollArea className="max-h-[calc(100vh-10rem)] overflow-auto">
          <div className="space-y-6 mx-8">
            <TrailMap trail={trail} />
            <TrailDetails trail={trail} />
            <DrawerDescription className="text-justify text-pretty">
              {trail.description}
            </DrawerDescription>
          </div>
        </ScrollArea>
        */}

        {/* Contenido del drawer */}
        <ScrollArea className="max-h-[calc(100vh-10rem)] overflow-auto">
          <div className="space-y-6 mx-8 md:flex md:space-x-8">
            <div className="md:flex-shrink-0 md:w-1/2 mb-4 md:mb-0">
              <TrailMap trail={trail} />
            </div>
            <div className="md:w-1/2">
              <TrailDetails trail={trail} />
              <DrawerDescription className="md:mx-4 mt-4 text-justify text-pretty">
                {trail.description}
              </DrawerDescription>
            </div>
          </div>
        </ScrollArea>

        {/* Botones de acción */}
        <DrawerFooter className="flex flex-row justify-center">
          <DrawerClose asChild>
            <Button
              variant="destructive"
              className="w-full max-w-xs font-semibold"
            >
              {t("drawer_close_button")}
            </Button>
          </DrawerClose>

          <a href={`/trails/${trail._id}`} className="w-full max-w-xs">
            <Button className="w-full max-w-xs font-semibold">
              {t("drawer_start_button")}
            </Button>
          </a>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
