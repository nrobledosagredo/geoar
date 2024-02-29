import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { useTranslation } from "react-i18next"

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

  useEffect(() => {
    setTexts([t("loading1"), t("loading2"), t("loading3")])
  }, [t])

  return (
    <div className="fixed inset-0 bg-background flex flex-col justify-evenly h-screen">
      {/* Logo */}
      <div className="">
        <VerticalLogo />
      </div>

      {/* Spinner */}
      <div className="flex w-full justify-center">
        <div className="animate-spin w-12 h-12 border-4 rounded-full border-t-primary"></div>
      </div>

      {/* Carousel con textos de carga */}
      <div className="flex w-full justify-center">
        <Carousel
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
                <div className="text-base mx-4 sm:text-lg md:text-xl lg:text-2xl font-semibold text-center text-pretty">
                  {text}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
