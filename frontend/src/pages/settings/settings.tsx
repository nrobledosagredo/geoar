// settings.tsx
import { SettingsForm } from "@/pages/settings/components/settings-form"
import { useTranslation } from "react-i18next"

import { Separator } from "@/components/ui/separator"
import { ControlPanel } from "@/components/control-panel"

export function Settings() {
  const { t } = useTranslation()
  return (
    <ControlPanel>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">{t("settings_title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("settings_description")}
          </p>
        </div>
        <Separator />
        <SettingsForm />
      </div>
    </ControlPanel>
  )
}
