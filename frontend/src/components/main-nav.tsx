import { LogoHorizontal } from "@/components/logo-horizontal"
import { UserNav } from "@/components/user-nav"

export function MainNav() {
  return (
    <div className="flex-col sm:flex bg-background/50 backdrop-blur-3xl">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <LogoHorizontal />
          <div className="ml-auto">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  )
}
