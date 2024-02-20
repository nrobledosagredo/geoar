// main-nav.tsx
import { HorizontalLogo } from "@/components/horizontal-logo"
import { UserNav } from "@/components/user-nav"

export function MainNav() {
  return (
    <div className="h-16 flex-col px-4 sm:flex bg-background/50 backdrop-blur-3xl border-b">
      <div className="flex h-full items-center">
        <HorizontalLogo />
        <div className="ml-auto">
          <UserNav />
        </div>
      </div>
    </div>
  )
}
