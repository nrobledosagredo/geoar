// use-max-scroll.ts
// Se encarga de manejar el scroll máximo de un texto
import { useEffect, useState } from "react"

export function useMaxScroll(text: string) {
  const [maxScroll, setMaxScroll] = useState(0)

  useEffect(() => {
    const charsPerLine = 45
    const lineHeight = 2.2

    // Divide el texto en líneas
    const linesArray = text.split("\n")

    // Calcula el número total de líneas en el texto
    let totalLines = 0
    linesArray.forEach((line) => {
      // Añade 1 por cada salto de línea adicional en el texto
      totalLines += Math.ceil(line.length / charsPerLine) || 1
    })

    // Calcula la altura total del texto
    const totalTextHeight = totalLines * lineHeight

    // Calcula el desplazamiento máximo
    setMaxScroll(totalTextHeight > 0 ? totalTextHeight : 0)
  }, [text])

  return maxScroll
}
