import { UserIdButton } from "@/components/user-id-button"

import { LogoHorizontal } from "@/components/logo-horizontal"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

export default function MainNav() {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <LogoHorizontal />
          <div className="ml-auto flex items-center space-x-4">
            <UserIdButton />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  )
}
