// language-context.tsx
import React, { createContext, ReactNode, useEffect, useState } from "react"

import i18n from "../i18n"

// Define the type for the context value
export interface LanguageContextType {
  language: string
  setLanguage: (lng: string) => void
}

// Create a context with a default value of undefined, but specify the type
export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

interface LanguageProviderProps {
  children: ReactNode // Defines children prop as ReactNode, a type provided by React for all possible children types
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const savedLanguage = localStorage.getItem("preferredLanguage")
  const [language, setLanguage] = useState<string>(
    savedLanguage || i18n.language
  ) // Explicitly declare the state variable type

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLanguage(lng)
    localStorage.setItem("preferredLanguage", lng) // Saves the language in localStorage
  }

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLanguage(lng) // Will also run when i18n changes the language
      localStorage.setItem("preferredLanguage", lng) // Saves the change in localStorage
    }

    i18n.on("languageChanged", handleLanguageChange)
    return () => {
      i18n.off("languageChanged", handleLanguageChange)
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
