import { FormEvent, useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

import { firebaseApp } from "@/components/auth"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null) // Definir error como string o null

  const navigate = useNavigate()
  const auth = getAuth(firebaseApp) // Inicializa auth con la app de Firebase

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/") // Redirige al usuario a la página de inicio después del inicio de sesión
    } catch (error) {
      // Asegúrate de que el error es una instancia de Error y tiene un mensaje
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Ocurrió un error inesperado") // Mensaje genérico para otros tipos de errores
      }
    }
  }

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  )
}
export default Login
