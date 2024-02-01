// account.tsx
import { Settings } from "@/pages/settings/settings"

import { Separator } from "@/components/ui/separator"

export function Account() {
  return (
    <Settings>
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
    </Settings>
  )
}