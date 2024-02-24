// use-card-toggle.js
import { useRef, useState } from "react"

import { Interaction } from "@/types/interaction-types"
import { config } from "@/lib/scene-config"

import { useCreateInteraction } from "./use-create-interaction"

const { cardToggleDelay } = config

export function useCardToggle(interactionDetails: Interaction) {
  const [isExpanded, setIsExpanded] = useState(false)
  const lastClickTime = useRef(Date.now())
  const { handleCreateInteraction } = useCreateInteraction()

  function cardToggle() {
    const now = Date.now()
    if (now - lastClickTime.current > cardToggleDelay) {
      lastClickTime.current = now
      setIsExpanded((prevIsExpanded) => !prevIsExpanded)
    }

    if (!isExpanded) {
      handleCreateInteraction(interactionDetails)
    }
  }

  return [isExpanded, cardToggle]
}
