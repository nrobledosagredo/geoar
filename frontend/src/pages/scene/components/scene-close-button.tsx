import { X } from "lucide-react"
import { useTranslation } from "react-i18next"
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
  const { t } = useTranslation()

  const handleConfirm = () => {
    navigate("/")
    //window.location.reload()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full transition duration-150 ease-in-out transform active:scale-90"
        >
          <X className="h-[1.3rem] w-[1.3rem]" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("end_trail_title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("end_trail_description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("end_trail_cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {t("end_trail_confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
