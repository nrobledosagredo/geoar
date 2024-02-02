// account.tsx
import { Separator } from "@/components/ui/separator"
import { ControlPanel } from "@/components/control-panel"

export function Account() {
  return (
    <ControlPanel>
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
    </ControlPanel>
  )
}
