// appearance.tsx
import { Settings } from "@/pages/settings/settings"

import { Separator } from "@/components/ui/separator"

export function Accessibility() {
  return (
    <Settings>
      <div>
        <h3 className="text-lg font-medium">Accessibility</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
    </Settings>
  )
}
