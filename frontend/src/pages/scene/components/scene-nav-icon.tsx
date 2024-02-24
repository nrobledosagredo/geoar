import {
  ArrowDownLeftSquare,
  ArrowDownRightSquare,
  ArrowDownSquare,
  ArrowLeftSquare,
  ArrowRightSquare,
  ArrowUpLeftSquare,
  ArrowUpRightSquare,
  ArrowUpSquare,
} from "lucide-react"

// Define una función que crea el elemento ícono con un className aplicado
const createIcon = (Component: React.ElementType, className: string) => (
  <Component className={className} />
)

// Modifica la función SceneNavIcon para aceptar un className
export function SceneNavIcon({
  direction,
  className = "h-8 text-muted-foreground",
}: {
  direction: string
  className?: string
}) {
  // Mapeo de direcciones a componentes de íconos, utilizando la función createIcon con el className aplicado
  const arrowIcons: { [key: string]: JSX.Element | null } = {
    North: createIcon(ArrowUpSquare, className),
    Northeast: createIcon(ArrowUpRightSquare, className),
    East: createIcon(ArrowRightSquare, className),
    Southeast: createIcon(ArrowDownRightSquare, className),
    South: createIcon(ArrowDownSquare, className),
    Southwest: createIcon(ArrowDownLeftSquare, className),
    West: createIcon(ArrowLeftSquare, className),
    Northwest: createIcon(ArrowUpLeftSquare, className),
  }

  // Selecciona el ícono basado en la dirección y devuelve el ícono con el className aplicado
  const Icon = arrowIcons[direction] || null

  return <div>{Icon}</div>
}
