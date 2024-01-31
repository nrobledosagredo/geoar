// show-uid-button.tsx
import { getAuth } from "firebase/auth"

export function ShowUidButton() {
  const showUid = () => {
    const auth = getAuth()
    const user = auth.currentUser
    const email = user?.email

    if (user) {
      console.log("UID del usuario:", user.uid)
      console.log("Email del usuario:", email)
    } else {
      console.log("No hay usuario autenticado.")
    }
  }

  return <button onClick={showUid}>UID</button>
}
