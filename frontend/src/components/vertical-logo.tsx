// vertical-logo.jsx
import { Trees } from "lucide-react"

export function VerticalLogo() {
  return (
    <div className="flex flex-col items-center">
      {/* Logo de la aplicación */}
      <Trees className="h-16 w-16 text-primary mb-[-2px]" />

      {/* Nombre de la aplicación */}
      <span className="self-center whitespace-nowrap tracking-tighter text-4xl leading-[1.1]">
        <span className="font-medium">Geo</span>
        <span className="font-black">AR</span>
      </span>
    </div>
  )
}
