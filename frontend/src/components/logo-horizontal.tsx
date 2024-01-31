// logo-horizontal.jsx
import { Trees } from "lucide-react"

export const LogoHorizontal = () => {
  return (
    <div className="flex flex-row items-center">
      {/* Logo de la aplicación */}
      <Trees className="h-8 w-8 text-green-600 mr-1" />

      {/* Nombre de la aplicación */}
      <span className="self-center whitespace-nowrap text-2xl">
        <span className="font-bold">Geo</span>
        <span className="font-black">AR</span>
      </span>
    </div>
  )
}