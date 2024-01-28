// show-uid-button.tsx
import { getAuth } from "firebase/auth"

export const ShowUidButton = () => {
  const showUid = () => {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      console.log("UID del usuario:", user.uid)
    } else {
      console.log("No hay usuario autenticado.")
    }
  }

  return <button onClick={showUid}>Mostrar UID del Usuario</button>
}