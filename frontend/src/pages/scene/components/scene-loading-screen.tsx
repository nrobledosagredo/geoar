import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { Apple } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { VerticalLogo } from "@/components/vertical-logo"

export function SceneLoadingScreen() {
  const { t } = useTranslation()
  const [texts, setTexts] = useState([
    t("loading1"),
    t("loading2"),
    t("loading3"),
  ])
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    setTexts([t("loading1"), t("loading2"), t("loading3")])
  }, [t])

  useEffect(() => {
    // Detectar si el dispositivo es iOS
    const userAgent = navigator.userAgent
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setIsIOS(true)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-background flex flex-col justify-evenly h-screen">
      {/* Mostrar alerta si es iOS */}
      {isIOS && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md z-50">
          <Alert>
            <Apple className="h-4 w-4" />
            <AlertTitle>{t("iosTitle")}</AlertTitle>
            <AlertDescription>{t("iosWarning")}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Logo */}
      <div className="">
        <VerticalLogo />
      </div>

      {/* Spinner */}
      <div className="flex w-full justify-center">
        <div className="animate-spin w-9 h-9 border-4 rounded-full border-t-primary"></div>
      </div>

      {/* Carousel con textos de carga */}
      <div className="flex w-full justify-center">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {texts.map((text, index) => (
              <CarouselItem key={index}>
                <div className="mx-4">
                  <div className="w-full h-full sm:text-lg md:text-xl lg:text-2xl font-semibold text-center text-pretty">
                    {text}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
