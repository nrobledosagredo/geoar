// not-found.tsx
import { useEffect } from "react"
import { FileX } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { Separator } from "@/components/ui/separator"

export function NotFound() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t("not_found_title")

    return () => {
      document.title = "GeoAR"
    }
  }, [t])

  return (
    <div className="h-screen bg-background flex flex-col justify-center items-center">
      <div className="mb-8">
        <Link to="/">
          <FileX className="h-10 w-10" />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <h1 className="font-bold text-2xl">404</h1>
        <Separator className="h-9" orientation="vertical" />
        <h2 className="text-sm">{t("not_found_description")}</h2>
      </div>
    </div>
  )
}
