// account.tsx
import { useEffect } from "react"
import { AccountForm } from "@/pages/account/components/account-form"
import { useTranslation } from "react-i18next"

import { Separator } from "@/components/ui/separator"
import { ControlPanel } from "@/components/control-panel"

export function Account() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `GeoAR: ${t("account_title")}`

    return () => {
      document.title = "GeoAR"
    }
  }, [t])
  return (
    <ControlPanel>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">{t("account_title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("account_description")}
          </p>
        </div>
        <Separator />
        <AccountForm />
      </div>
    </ControlPanel>
  )
}
