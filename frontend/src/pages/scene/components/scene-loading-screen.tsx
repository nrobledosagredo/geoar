// LoadingScreen.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { VerticalLogo } from "@/components/vertical-logo";

export function SceneLoadingScreen() {
  const { t } = useTranslation();
  const [currentText, setCurrentText] = useState(0);
  const [texts, setTexts] = useState([t("loading1"), t("loading2"), t("loading3")]);

  useEffect(() => {
    setTexts([t("loading1"), t("loading2"), t("loading3")]);
    
    const intervalId = setInterval(() => {
      setCurrentText((currentText) => (currentText + 1) % texts.length);
    }, 3000);
  
    return () => clearInterval(intervalId);
  }, [t]);
  

  return (
    <div className="fixed inset-0 bg-[#0c0a09] flex flex-col justify-between z-[200] h-screen">

      {/* Logo */}
      <div className="flex items-center justify-center h-1/3 pt-20">
        <VerticalLogo />
      </div>

      {/* Spinner */}
      <div className="flex items-center justify-center h-1/3">
        <div className="animate-spin inline-block w-12 h-12 border-4 color-primary rounded-full border-t-transparent"></div>
      </div>

      {/* Textos */}
      <div className="flex items-center justify-center h-1/3">
        <p className="text-white text-3xl font-semibold mb-60">
          {texts[currentText]}
        </p>
      </div>
    </div>
  );
};