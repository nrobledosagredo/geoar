// app.tsx
import { useEffect, useState } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { Account } from "@/pages/account/account"
import { Login } from "@/pages/auth/login/login"
import { Register } from "@/pages/auth/register/register"
import { Home } from "@/pages/home/home"
import { NotFound } from "@/pages/not-found/not-found"
import { Settings } from "@/pages/settings/settings"
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

import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authInstance = getAuth()
    setPersistence(authInstance, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(authInstance, (user) => {
        setCurrentUser(user)
        setLoading(false)
      })

      return () => unsubscribe()
    })
  }, [])

  if (loading) {
    return <div className="w-full h-full bg-black"></div>
  }

  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route
              path="/auth/login"
              element={currentUser ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/auth/register"
              element={currentUser ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="/"
              element={currentUser ? <Home /> : <Navigate to="/auth/login" />}
            />

            <Route
              path="/account"
              element={
                currentUser ? <Account /> : <Navigate to="/auth/login" />
              }
            />

            <Route
              path="/settings"
              element={
                currentUser ? <Settings /> : <Navigate to="/auth/login" />
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
