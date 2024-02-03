// home.tsx
import { useTranslation } from "react-i18next"

import { LogoVertical } from "@/components/logo-vertical"
import { MainNav } from "@/components/main-nav"

export function Home() {
  const { t } = useTranslation()
  return (
    <div className="h-screen flex flex-col justify-between bg-[#ffffff] dark:bg-[#0c0a09]">
      {/* Barra de navegación */}
      <MainNav />

      {/* Contenedor de la página de inicio */}
      <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
        {/* Título */}
        <div className="mb-8 scale-150">
          <LogoVertical />
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            <span className="font-bold">{t("welcome_description")}</span>
            <span className="font-black"> {t("augmented_reality")}</span>
            <span className="font-bold">.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
