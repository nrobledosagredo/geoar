// i18n.js
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import translationEN from "./locales/en.json"
import translationES from "./locales/es.json"

// Intenta obtener el idioma guardado en LocalStorage, si no existe, usa 'es'
const savedLanguage = localStorage.getItem("preferredLanguage") || "es"

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: translationES },
    en: { translation: translationEN },
  },
  lng: savedLanguage, // Usa el idioma guardado o el idioma por defecto
  fallbackLng: "es", // Si no se encuentra la traducción, usa español
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
