import React from "react"
import { useTranslation } from "react-i18next"

import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { SidebarNav } from "@/components/sidebar-nav"

interface SettingsProps {
  children: React.ReactNode
}

export const ControlPanel: React.FC<SettingsProps> = ({ children }) => {
  const { t } = useTranslation()
  const sidebarNavItems = [
    {
      title: t("account_title"),
      href: "/account",
    },
    {
      title: t("settings_title"),
      href: "/settings",
    },
  ]

  return (
    <>
      <MainNav />
      <div className="space-y-6 px-10 py-4 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            {t("control_panel_title")}
          </h2>
          <p className="text-muted-foreground">
            {t("control_panel_description")}
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
