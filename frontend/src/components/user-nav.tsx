import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useUser } from "@/hooks/use-user"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { User } from "lucide-react"

export function UserNav() {
  const user = useUser()
  const userID = user?.uid
  const userEmail = user?.email || "Invitado"
  const { toast } = useToast()
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast({
          description: "Has cerrado sesión exitosamente.",
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
          <Avatar>
            <AvatarImage src="/avatars/01.png" alt="@user" />
            <AvatarFallback> <User></User></AvatarFallback>
          </Avatar>
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

          {/* Perfíl */}
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          {/* Configuración */}
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* Separador */}
        <DropdownMenuSeparator />

        {/* Cerrar sesión */}
        <DropdownMenuItem onSelect={handleLogOut}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
