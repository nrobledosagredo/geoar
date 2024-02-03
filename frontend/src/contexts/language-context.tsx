// language-context.tsx
import React, { createContext, ReactNode, useEffect, useState } from "react";

import i18n from "@/lib/i18n";

// Definir el tipo para el valor del contexto
export interface LanguageContextType {
  language: string;
  setLanguage: (lng: string) => void;
}

// Crear un contexto con un valor predeterminado de undefined, pero especificar el tipo
export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode; // Define la propiedad children como ReactNode, un tipo proporcionado por React para todos los posibles tipos de hijos
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const savedLanguage = localStorage.getItem("preferredLanguage");
  const [language, setLanguage] = useState<string>(
    savedLanguage || i18n.language
  ); // Declarar explícitamente el tipo de la variable de estado

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("preferredLanguage", lng); // Guarda el idioma en localStorage
  };

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLanguage(lng); // También se ejecutará cuando i18n cambie el idioma
      localStorage.setItem("preferredLanguage", lng); // Guarda el cambio en localStorage
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};