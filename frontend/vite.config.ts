import fs from "fs"
import path from "path"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"
import { defineConfig } from "vite"

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, process.env.SSL_KEY_PATH)),
      cert: fs.readFileSync(path.resolve(__dirname, process.env.SSL_CERT_PATH)),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
