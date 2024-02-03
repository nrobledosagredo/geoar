import { signOut } from "firebase/auth"
import { LogOut, Menu, Settings, User } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { auth } from "@/lib/firebase"
import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

export function UserNav() {
  const { t } = useTranslation()
  const user = useUser()
  const userID = user?.uid
  const userEmail = user?.email || t("guest")
  const { toast } = useToast()
  const navigate = useNavigate()

  const navigateTo = (path: string) => () => {
    navigate(path)
  }

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast({
          description: t("logout_success"),
        })
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error)
      })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userEmail}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userID}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* Cuenta */}
          <DropdownMenuItem onSelect={navigateTo("/account")}>
            <User className="mr-2 h-4 w-4" />
            <span>{t("account")}</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          {/* Accesibilidad */}
          <DropdownMenuItem onSelect={navigateTo("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t("settings")}</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* Separador */}
        <DropdownMenuSeparator />

        {/* Cerrar sesión */}
        <DropdownMenuItem onSelect={handleLogOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("logout_button")}</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
