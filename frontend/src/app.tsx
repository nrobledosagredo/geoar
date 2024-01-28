// app.tsx
import { useEffect, useState } from "react"
import { Login } from "@/pages/auth/login"
import { Register } from "@/pages/auth/register"
import { Home } from "@/pages/home"
import { NotFound } from "@/pages/not-found"
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  User,
} from "firebase/auth"
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"

import { ThemeProvider } from "@/components/theme-provider"

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authInstance = getAuth()
    setPersistence(authInstance, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(authInstance, (user) => {
        setCurrentUser(user)
        setLoading(false) // Actualiza el estado de carga cuando la autenticación se ha verificado
      })

      return () => unsubscribe() // Limpiar suscripción
    })
  }, [])

  if (loading) {
    return <div>Cargando...</div> // O cualquier otra representación de carga
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route
            path="/"
            element={currentUser ? <Home /> : <Navigate to="/auth/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
