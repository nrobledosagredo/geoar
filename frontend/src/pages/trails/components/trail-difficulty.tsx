// trail-difficulty.tsx
import { Star } from "lucide-react"

export function TrailDifficulty({ difficulty }: { difficulty: string }) {
  let config = ["fill-none", "fill-none", "fill-none"]

  switch (difficulty) {
    case "Easy":
    case "Fácil":
      config = ["fill-green-500", "fill-none", "fill-none"]
      break
    case "Moderada":
    case "Moderate":
      config = ["fill-yellow-500", "fill-yellow-500", "fill-none"]
      break
    case "Hard":
    case "Difícil":
      config = ["fill-red-500", "fill-red-500", "fill-red-500"]
      break
    default:
      break
  }

  return (
    <div className="flex items-center mt-1">
      {config.map((fill, index) => (
        <Star key={index} className={`h-4 ${fill}`} />
      ))}
    </div>
  )
}
