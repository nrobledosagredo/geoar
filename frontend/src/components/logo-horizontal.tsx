import { Link } from 'react-router-dom';
import { Trees } from 'lucide-react';

export const LogoHorizontal = () => {
  return (
    <Link to="/" className="flex flex-row items-center no-underline ml-[-3px]">
      {/* Logo de la aplicación */}
      <Trees className="h-6 w-6 text-green-600 mr-1" />

      {/* Nombre de la aplicación */}
      <span className="self-center whitespace-nowrap text-xl text-black"> {/* Asegúrate de agregar estilos para el texto si es necesario */}
        <span className="font-bold">Geo</span>
        <span className="font-black">AR</span>
      </span>
    </Link>
  );
};
