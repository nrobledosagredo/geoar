import { LogoHorizontal } from "@/components/logo-horizontal"
import { LanguageForm } from "@/components/temp/language-form"
import { UserNav } from "@/components/user-nav"

export function MainNav() {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <LogoHorizontal />
          <div className="ml-auto flex items-center space-x-4">
            <LanguageForm />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  )
}
