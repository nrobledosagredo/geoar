// i18n.ts
import translationEN from "@/locales/en/common.json"
import zodTranslationEN from "@/locales/en/zod.json"
import translationES from "@/locales/es/common.json"
import zodTranslationES from "@/locales/es/zod.json"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Intenta obtener el idioma guardado en LocalStorage, si no existe, usa 'es'
const savedLanguage = localStorage.getItem("preferredLanguage") || "es"

i18n
  .use(initReactI18next) // pasa i18n (i18next) a react-i18next
  .init({
    resources: {
      es: {
        translation: translationES,
        zod: zodTranslationES,
      },
      en: {
        translation: translationEN,
        zod: zodTranslationEN,
      },
    },
    lng: savedLanguage, // Usa el idioma guardado o el idioma por defecto
    fallbackLng: "es", // Si no se encuentra la traducción, usa español
    interpolation: {
      escapeValue: false, // React ya escapa valores por defecto
    },
  })

export default i18n
