// scene-nav-settings.tsx
import { useState } from "react"
import { SceneSpeechToggle } from "@/pages/scene/components/scene-speech-toggle"
import { SceneCloseButton } from "@/pages/scene/components/scene-close-button"
import { ChevronUp, ChevronDown } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function SceneNavSettings({
  bearing,
  distance,
}: {
  bearing: string
  distance: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-2"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full transition duration-150 ease-in-out transform active:scale-90"
        >
          {isOpen ? <ChevronUp className="h-[1.2rem] w-[1.2rem]" /> : <ChevronDown className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
      <SceneSpeechToggle
          bearing={bearing ?? ""}
          distance={distance ?? ""}
          speaking={speaking}
          setSpeaking={setSpeaking}
        />
        <ModeToggle />
        <SceneCloseButton />

        
      </CollapsibleContent>
    </Collapsible>
  )
}
