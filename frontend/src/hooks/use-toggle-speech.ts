// use-toggle-speech.ts
import { useEffect, useState } from "react"

import { speak } from "@/lib/speech-synthesis"

let currentId: string | null = null

export function useToggleSpeech(id: string, description: string) {
  const [speaking, setSpeaking] = useState(false)

  function toggleSpeech() {
    if (currentId !== id && window.speechSynthesis.speaking) {
      window.dispatchEvent(new CustomEvent("speechPlay", { detail: { id } }))
      window.speechSynthesis.cancel()
      speak(description, () => setSpeaking(false))
      setSpeaking(true)
      currentId = id
    } else if (window.speechSynthesis.speaking) {
      if (window.speechSynthesis.paused && currentId === id) {
        window.speechSynthesis.resume()
        setSpeaking(true)
      } else {
        window.speechSynthesis.pause()
        setSpeaking(false)
      }
    } else {
      speak(description, () => setSpeaking(false))
      setSpeaking(true)
      window.dispatchEvent(new CustomEvent("speechStart"))
    }
    currentId = id
  }

  useEffect(() => {
    const handleToggleSpeech = (event: Event) => {
      const e = event as CustomEvent<{ id: string }>
      if (e.detail.id !== id) {
        setSpeaking(false)
      }
    }

    window.addEventListener("speechPlay", handleToggleSpeech)

    return () => {
      window.removeEventListener("speechPlay", handleToggleSpeech)
    }
  }, [id])

  return { speaking, toggleSpeech }
}
