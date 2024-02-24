// scene-nav-toggle-speech.tsx
import { useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { useTranslation } from "react-i18next"

import { speak } from "@/lib/speech-synthesis"
import { Button } from "@/components/ui/button"

export function SceneSpeechToggle({
  bearing,
  distance,
  speaking,
  setSpeaking,
}: {
  bearing: string
  distance: string
  speaking: boolean
  setSpeaking: (speaking: boolean) => void
}) {
  const { t } = useTranslation()
  const justActivated = useRef(false)

  useEffect(() => {
    if (speaking && bearing && distance) {
      window.speechSynthesis.cancel()
      const textToSpeak = `${t("head")} ${t(`directions.${bearing}`)} ${t("for")} ${parseInt(distance, 10)} ${t("meters")}`
      speak(textToSpeak)
    }
    justActivated.current = false
  }, [bearing, distance, speaking, t])

  const toggleSpeech = () => {
    if (speaking) {
      window.speechSynthesis.cancel()
    } else {
      justActivated.current = true
    }
    setSpeaking(!speaking)
  }

  return (
    <div>
      <Button
        variant="secondary"
        size="icon"
        onClick={toggleSpeech}
        className="rounded-full transition duration-150 ease-in-out transform active:scale-90"
      >
        {speaking ? (
          <Volume2 className="h-[1.2rem] w-[1.2rem] " />
        ) : (
          <VolumeX className="text-[#ef4928] h-[1.2rem] w-[1.2rem] " />
        )}
      </Button>
    </div>
  )
}
