// home.tsx
import { ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { LogoVertical } from "@/components/logo-vertical"
import { MainNav } from "@/components/main-nav"

export function Home() {
  const { t } = useTranslation()
  return (
    <div className="h-screen flex flex-col">
      {/* Barra de navegación */}
      <MainNav />

      {/* Contenedor de la página de inicio */}
      <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
        {/* Título */}
        <div className="mb-4">
          <LogoVertical />
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <p className="text-xl text-muted-foreground">
            <span className="font-semibold">{t("welcome_description")}</span>
            <span className="font-bold"> {t("augmented_reality")}</span>
            <span className="font-semibold">.</span>
          </p>
        </div>

        {/* Botón para ir a la lista de senderos */}
        <div>
          <Link to="/trails">
            <Button className="font-semibold">
              {t("start_button")}
              <ChevronRight className="h-4 mt-0.5 -mr-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
