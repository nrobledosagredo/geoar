import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react"

// Define una función que crea el elemento ícono con un className aplicado
const createIcon = (Component: React.ElementType, className: string) => (
  <Component className={className} />
)

// Modifica la función SceneNavIcon para aceptar un className
export function SceneNavIcon({
  direction,
  className = "h-7 w-7 text-primary font-semibold",
}: {
  direction: string
  className?: string
}) {
  // Mapeo de direcciones a componentes de íconos, utilizando la función createIcon con el className aplicado
  const arrowIcons: { [key: string]: JSX.Element | null } = {
    North: createIcon(ArrowUp, className),
    Northeast: createIcon(ArrowUpRight, className),
    East: createIcon(ArrowRight, className),
    Southeast: createIcon(ArrowDownRight, className),
    South: createIcon(ArrowDown, className),
    Southwest: createIcon(ArrowDownLeft, className),
    West: createIcon(ArrowLeft, className),
    Northwest: createIcon(ArrowUpLeft, className),
  }

  // Selecciona el ícono basado en la dirección y devuelve el ícono con el className aplicado
  const Icon = arrowIcons[direction] || null

  return <div>{Icon}</div>
}
