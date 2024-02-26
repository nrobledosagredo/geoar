// scene-nav-settings.tsx
import { useEffect, useState } from "react"
import { SceneCloseButton } from "@/pages/scene/components/scene-close-button"
import { SceneSpeechToggle } from "@/pages/scene/components/scene-speech-toggle"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useTranslation } from "react-i18next"

import { speak } from "@/lib/speech-synthesis"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ModeToggle } from "@/components/mode-toggle"

export function SceneNavSettings({
  bearing,
  distance,
}: {
  bearing: string
  distance: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (speaking && bearing && distance) {
      window.speechSynthesis.cancel()
      const textToSpeak = `${t("head")} ${t(`directions.${bearing}`)} ${t("for")} ${parseInt(distance, 10)} ${t("meters")}`
      speak(textToSpeak)
    }
  }, [bearing, distance, speaking, t])

  const toggleSpeech = () => {
    if (speaking) {
      window.speechSynthesis.cancel()
    }
    setSpeaking(!speaking)
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <CollapsibleTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full transition duration-150 ease-in-out transform active:scale-90"
        >
          {isOpen ? (
            <ChevronUp className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <ChevronDown className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <SceneSpeechToggle speaking={speaking} onToggle={toggleSpeech} />
        <ModeToggle />
        <SceneCloseButton />
      </CollapsibleContent>
    </Collapsible>
  )
}
