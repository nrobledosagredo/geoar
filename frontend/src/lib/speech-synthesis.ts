import i18n from "@/lib/i18n"

let cachedLanguageCode: string | undefined

// Función que obtiene el código del lenguaje
async function getLanguageCode(): Promise<string> {
  if (cachedLanguageCode) return cachedLanguageCode

  const voices = await new Promise<SpeechSynthesisVoice[]>((resolve) => {
    let voices = window.speechSynthesis.getVoices()
    if (voices.length) {
      resolve(voices)
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices()
        resolve(voices)
      }
    }
  })

  if (i18n.language === "es") {
    const esVoice = voices.find((voice) => voice.lang === "es-MX")
    cachedLanguageCode = esVoice ? "es-MX" : "es-ES"
    return cachedLanguageCode
  }
  return "en-US"
}

// Función que reproduce el TTS
export async function speak(
  text: string,
  onEndCallback?: () => void
): Promise<void> {
  if (!window.speechSynthesis) {
    console.warn("Speech synthesis not supported in this browser.")
    return
  }

  const languageCode = await getLanguageCode()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = languageCode
  utterance.volume = 0.5

  if (onEndCallback) {
    utterance.onend = onEndCallback
  }

  //console.log("Language code:", languageCode)
  window.speechSynthesis.speak(utterance)
}
