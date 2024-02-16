import { Trees } from "lucide-react"
import { Link } from "react-router-dom"

export const LogoHorizontal = () => {
  return (
    <Link to="/" className="flex flex-row items-center no-underline ml-[-3px]">
      {/* Logo de la aplicación */}
      <Trees className="h-6 w-6 text-green-600 mr-1" />

      {/* Nombre de la aplicación */}
      <span className="self-center whitespace-nowrap tracking-tighter text-2xl">
        {" "}
        {/* Asegúrate de agregar estilos para el texto si es necesario */}
        <span className="font-semibold">Geo</span>
        <span className="font-black">AR</span>
      </span>
    </Link>
  )
}
