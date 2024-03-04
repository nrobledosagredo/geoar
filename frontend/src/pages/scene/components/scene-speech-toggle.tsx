// scene-nav-toggle-speech.tsx
import { Volume2, VolumeX } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SceneSpeechToggle({
  speaking,
  onToggle,
}: {
  speaking: boolean
  onToggle: () => void
}) {
  return (
    <div>
      <Button
        variant="secondary"
        size="icon"
        onClick={onToggle}
        className="rounded-full transition duration-150 ease-in-out transform active:scale-90"
      >
        {speaking ? (
          <Volume2 className="h-[1.3rem] w-[1.3rem] " />
        ) : (
          <VolumeX className="text-destructive h-[1.3rem] w-[1.3rem] " />
        )}
      </Button>
    </div>
  )
}
