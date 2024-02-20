// scene-nav-toggle-speech.tsx
import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { useTranslation } from "react-i18next"

import { speak } from "@/lib/speech-synthesis"
import { Button } from "@/components/ui/button"

export function SceneNavToggleSpeech({
  bearing,
  distance,
}: {
  bearing: string
  distance: string
}) {
  const [speaking, setSpeaking] = useState(false)
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
    <div className="flex justify-center">
      <Button
        variant="secondary"
        size="icon"
        onClick={toggleSpeech}
        className="rounded-full transition duration-150 ease-in-out transform active:scale-90 h-16 w-16"
      >
        {speaking ? (
          <Volume2 className="text-gray-700 h-10 w-10" />
        ) : (
          <VolumeX className="text-[#ef4928] h-10 w-10" />
        )}
      </Button>
    </div>
  )
}
