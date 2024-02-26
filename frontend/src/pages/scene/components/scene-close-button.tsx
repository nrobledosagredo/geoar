import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function SceneCloseButton() {
  const navigate = useNavigate()

  const handleConfirm = () => {
    navigate("/")
    window.location.reload()
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full transition duration-150 ease-in-out transform active:scale-90"
          >
            <X className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Terminar recorrido</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas dar por terminado el recorrido?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
