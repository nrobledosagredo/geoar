// use-get-trees.ts
import { useEffect, useState } from "react"
import { getTrees } from "@/services/trees-service"

import { Tree } from "@/types/tree"

export function useGetTrees() {
  const [trees, setTrees] = useState<Tree[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleGetTrees = async () => {
      try {
        setLoading(true)
        const trees = await getTrees()
        setTrees(trees)
        setError(null)
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    handleGetTrees()
  }, [])

  return { trees, loading, error }
}
