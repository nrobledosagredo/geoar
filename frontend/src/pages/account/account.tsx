// account.tsx
import { AccountForm } from "@/pages/account/account-form"

import { Separator } from "@/components/ui/separator"
import { ControlPanel } from "@/components/control-panel"

export function Account() {
  return (
    <ControlPanel>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings. Set your preferred language and
            timezone.
          </p>
        </div>
        <Separator />
        <AccountForm />
      </div>
    </ControlPanel>
  )
}
