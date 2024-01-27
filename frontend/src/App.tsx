import Home from "@/pages/Home"
import Login from "@/pages/Login"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
