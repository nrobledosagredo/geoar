// logo-vertical.jsx
import { Trees } from "lucide-react"

export const LogoVertical = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Logo de la aplicación */}
      <Trees className="text-2xl text-green-600 mb-[-2px]" />

      {/* Nombre de la aplicación */}
      <span className="self-center whitespace-nowrap text-xl text-black dark:text-white">
        <span className="font-bold">Geo</span>
        <span className="font-black">AR</span>
      </span>
    </div>
  )
}
