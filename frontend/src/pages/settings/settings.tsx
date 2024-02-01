import React from "react"

import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { SidebarNav } from "@/components/sidebar-nav"

const sidebarNavItems = [
  {
    title: "Account",
    href: "/account",
  },
  {
    title: "Accessibility",
    href: "/accessibility",
  },
]

interface SettingsProps {
  children: React.ReactNode
}

export const Settings: React.FC<SettingsProps> = ({ children }) => {
  return (
    <>
      <MainNav />
      <div className="space-y-6 px-10 py-6 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            {/* Asegúrate de adaptar SidebarNav para que funcione con react-router-dom */}
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
