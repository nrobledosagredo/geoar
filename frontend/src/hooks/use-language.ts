// use-language.ts
import { useContext } from "react"
import {
  LanguageContext,
  LanguageContextType,
} from "@/contexts/language-context"

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Este error solo ocurrirá si se usa el contexto fuera de un proveedor
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
