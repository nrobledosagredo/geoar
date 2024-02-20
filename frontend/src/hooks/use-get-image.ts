// use-get-image.ts
import { useEffect, useState } from "react"
import { getImage } from "@/services/images-service"

export function useGetImage(url: string) {
  const [image, setImage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchImage() {
      try {
        setLoading(true)
        const proxiedUrl = await getImage(url)
        setImage(proxiedUrl)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchImage()
  }, [url])

  return { image, loading, error }
}
