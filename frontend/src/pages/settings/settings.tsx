// settings.tsx
import { SettingsForm } from "@/pages/settings/settings-form"

import { Separator } from "@/components/ui/separator"
import { ControlPanel } from "@/components/control-panel"

export function Settings() {
  return (
    <ControlPanel>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Automatically switch between
            day and night themes.
          </p>
        </div>
        <Separator />
        <SettingsForm />
      </div>
    </ControlPanel>
  )
}
