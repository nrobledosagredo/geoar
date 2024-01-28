// Home.tsx
import { LogOutButton } from '@/pages/auth';
import ShowUidButton from '@/pages/auth/ShowUidButton';

export const Home = () => {
  return (
    <div>
      {/* Otro contenido de tu componente */}
      <LogOutButton /> {/* Botón de cierre de sesión */}
      <ShowUidButton /> {/* Botón para mostrar el UID del usuario */}
    </div>
  );
};