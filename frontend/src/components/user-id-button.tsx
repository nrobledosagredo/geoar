// user-id-button.tsx
import { getAuth } from "firebase/auth"

export function UserIdButton() {
  const showUid = () => {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      console.log("UID del usuario:", user.uid)
      console.log("Email del usuario:", user.email)
    } else {
      console.log("No hay usuario autenticado.")
    }
  }

  return <button onClick={showUid}>UID</button>
}
