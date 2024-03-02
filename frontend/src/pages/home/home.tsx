// home.tsx
import { useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { VerticalLogo } from "@/components/vertical-logo"

export function Home() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = "GeoAR"
  }, [t])

  return (
    <div className="h-screen flex flex-col">
      {/* Barra de navegación */}
      <MainNav />

      {/* Contenedor de la página de inicio */}
      <div className="flex flex-col flex-1 justify-center text-center p-6 space-y-8">
        {/* Título */}
        <VerticalLogo />

        {/* Descripción */}
        <p className="text-xl text-muted-foreground pb-4">
          <span className="font-semibold">{t("welcome_description")}</span>
          <span className="font-bold"> {t("augmented_reality")}</span>
          <span className="font-semibold">.</span>
        </p>

        {/* Botón para ir a la lista de senderos */}
        <div>
          <Link to="/trails">
            <Button className="font-bold">
              {t("start_button")}
              <ChevronRight className="font-black h-4 mt-0.5 -mr-2" />
            </Button>
          </Link>
        </div>

        {/* Botón para ir a la página de permisos 
        <div>
          <Link to="/permissions">
            <Button className="font-semibold">
              Permisos
              <ChevronRight className="h-4 mt-0.5 -mr-2" />
            </Button>
          </Link>
        </div>
        */}
      </div>
    </div>
  )
}
