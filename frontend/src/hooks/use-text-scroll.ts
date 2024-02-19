// useTextScrolling.ts
import { useEffect, useRef } from "react"

export function useTextScroll(
  maxScrollPosition: number,
  setScrollPosition: (
    position: number | ((prevPosition: number) => number)
  ) => void
) {
  const scrollInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const scrollTextUp = () => {
    scrollInterval.current = setInterval(() => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 1
        return newPosition < maxScrollPosition ? newPosition : prevPosition
      })
    }, 10)
  }

  const scrollTextDown = () => {
    scrollInterval.current = setInterval(() => {
      setScrollPosition((prevPosition) => {
        return prevPosition > 0 ? prevPosition - 1 : 0
      })
    }, 10)
  }

  const stopTextScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current)
    }
  }

  useEffect(() => {
    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current)
      }
    }
  }, [])

  return { scrollTextUp, scrollTextDown, stopTextScroll }
}
