// logo-vertical.jsx
import { Trees } from "lucide-react"

export const LogoVertical = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Logo de la aplicación */}
      <Trees className="h-16 w-16 text-green-600 mb-[-2px]" />

      {/* Nombre de la aplicación */}
      <span className="self-center whitespace-nowrap tracking-tighter text-6xl leading-[1.1]">
        <span className="font-semibold">Geo</span>
        <span className="font-black">AR</span>
      </span>
    </div>
  )
}
