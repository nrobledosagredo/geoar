import React from "react"
import { Star } from "lucide-react"

interface DifficultyStarsProps {
  difficulty: string
}

export const DifficultyStars: React.FC<DifficultyStarsProps> = ({
  difficulty,
}) => {
  let starsConfig = ["fill-none", "fill-none", "fill-none"]

  switch (difficulty) {
    case "Easy":
    case "Fácil":
      starsConfig = ["fill-green-500", "fill-none", "fill-none"]
      break
    case "Moderada":
    case "Moderate":
      starsConfig = ["fill-yellow-500", "fill-yellow-500", "fill-none"]
      break
    case "Hard":
    case "Difícil":
      starsConfig = ["fill-red-500", "fill-red-500", "fill-red-500"]
      break
    default:
      break
  }

  return (
    <div className="flex items-center mt-1">
      {starsConfig.map((fillClass, index) => (
        <Star key={index} className={`h-4 ${fillClass}`} />
      ))}
    </div>
  )
}
