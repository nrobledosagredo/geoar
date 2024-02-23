// use-create-interaction.ts
import { useState } from "react"
import { createInteraction } from "@/services/interactions-service"

import { Interaction } from "@/types/interaction-types"

export function useCreateInteraction() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [response, setResponse] = useState<any>(null)

  async function handleCreateInteraction(interaction: Interaction) {
    setLoading(true)
    setError(null)
    try {
      const result = await createInteraction(interaction)
      setResponse(result)
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return { handleCreateInteraction, loading, error, response }
}
