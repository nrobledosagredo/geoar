import i18n from "@/lib/i18n"

let cachedLanguageCode: string | undefined

// Función que obtiene el código del lenguaje
const getLanguageCode = async (): Promise<string> => {
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

// Función que pausa el TTS
export function pauseSpeech(): void {
  if (window.speechSynthesis?.speaking) {
    window.speechSynthesis.pause()
    //console.log("TTS pausado");
  }
}

// Función que reanuda el TTS
export function resumeSpeech(): void {
  if (window.speechSynthesis?.paused) {
    window.speechSynthesis.resume()
    //console.log("TTS reanudado");
  }
}

// Función que detiene el TTS
export function stopSpeech(): void {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel()
    //console.log("TTS detenido");
  }
}

// Función que reproduce el TTS
export async function textToSpeech(text: string): Promise<void> {
  // Convertir esta función en asíncrona

  // Comprobación de si el navegador soporta TTS
  if (!window.speechSynthesis) {
    console.warn("Speech synthesis not supported in this browser.")
    return
  }

  // Configurar TTS
  const languageCode = await getLanguageCode() // Esperar a que la promesa se resuelva
  const utterance = new SpeechSynthesisUtterance(text) // Crear objeto de TTS
  utterance.lang = languageCode // Establecer código del lenguaje
  utterance.volume = 0.5 // Establecer volumen
  console.log("Código del lenguaje:", languageCode)

  // Reproducir TTS
  window.speechSynthesis.speak(utterance)
}
