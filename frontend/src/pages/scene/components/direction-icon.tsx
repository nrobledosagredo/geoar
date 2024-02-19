// direction-icon.tsx
import {
  MoveDown,
  MoveDownLeft,
  MoveDownRight,
  MoveLeft,
  MoveRight,
  MoveUp,
  MoveUpLeft,
  MoveUpRight,
} from "lucide-react"

const arrowIcons: { [key: string]: JSX.Element } = {
  North: <MoveUp />,
  Northeast: <MoveUpRight />,
  East: <MoveRight />,
  Southeast: <MoveDownRight />,
  South: <MoveDown />,
  Southwest: <MoveDownLeft />,
  West: <MoveLeft />,
  Northwest: <MoveUpLeft />,
}

export function DirectionIcon({ direction }: { direction: string }) {
  const Icon = arrowIcons[direction] || null

  return <div className="text-5xl mb-[-16px]">{Icon}</div>
}
