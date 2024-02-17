// use-get-trees.ts
import { useEffect, useState } from "react"
import { getTreeCards } from "@/services/treecards-service"

import { TreeCard } from "@/types/treecard-types"

export function useGetTreeCards() {
  const [treeCards, setTreeCards] = useState<TreeCard[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function handleGetTreeCards() {
      try {
        setLoading(true)
        const trees = await getTreeCards()
        setTreeCards(trees)
        setError(null)
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    handleGetTreeCards()
  }, [])

  return { treeCards, loading, error }
}