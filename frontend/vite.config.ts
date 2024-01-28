import fs from "fs"
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, "./192.168.159.129+3-key.pem")
      ),
      cert: fs.readFileSync(path.resolve(__dirname, "./192.168.159.129+3.pem")),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
