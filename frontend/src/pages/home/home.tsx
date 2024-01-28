// home.tsx
import { LogOutButton, ShowUidButton } from '@/pages/auth';

export const Home = () => {
  return (
    <div>
      {/* Otro contenido de tu componente */}
      <LogOutButton /> {/* Botón de cierre de sesión */}
      <ShowUidButton /> {/* Botón para mostrar el UID del usuario */}
    </div>
  );
};