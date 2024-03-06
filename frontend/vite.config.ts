import fs from "fs"
import path from "path"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        name: "GeoAR",
        short_name: "GeoAR",
        description: "GeoAR",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    https:
      process.env.USE_HTTPS === "true"
        ? {
            key: fs.readFileSync(
              path.resolve(__dirname, process.env.SSL_KEY_PATH)
            ),
            cert: fs.readFileSync(
              path.resolve(__dirname, process.env.SSL_CERT_PATH)
            ),
          }
        : undefined,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
