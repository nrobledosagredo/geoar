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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Barra de navegación */}
      <MainNav />

      {/* Contenedor de la página de inicio */}
      <div className="flex-grow flex flex-col justify-center items-center text-center space-y-8">
        {/* Título */}
        <VerticalLogo />

        {/* Descripción */}
        <p className="text-xl text-muted-foreground pb-4">
          <span className="font-medium">{t("welcome_description")}</span>
          <span className="font-bold"> {t("augmented_reality")}</span>
          <span className="font-medium">.</span>
        </p>

        {/* Botón para ir a la lista de senderos */}
        <div>
          <Link to="/trails">
            <Button className="font-semibold">
              {t("start_button")}
              <ChevronRight className="font-black h-4 mt-0.5 -mr-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
