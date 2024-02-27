// horizontal-logo.tsx
import { Trees } from "lucide-react"
import { Link } from "react-router-dom"

export function HorizontalLogo() {
  return (
    <Link to="/" className="flex flex-row items-center no-underline ml-[-3px]">
      {/* Logo de la aplicación */}
      <Trees className="h-6 w-6 text-green-600 mr-1" />

      {/* Nombre de la aplicación */}
      <span className="self-center whitespace-nowrap tracking-tighter text-2xl">
        <span className="font-medium">Geo</span>
        <span className="font-black">AR</span>
      </span>
    </Link>
  )
}
