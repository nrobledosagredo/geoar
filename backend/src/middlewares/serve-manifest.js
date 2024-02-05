import path, { dirname } from "path"
import { fileURLToPath } from "url"

// Obtener __dirname en ES Module
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const serveManifest = (req, res, next) => {
  if (req.path === "/site.webmanifest") {
    return res.sendFile(
      path.join(__dirname, "..", "public", "site.webmanifest"),
      {
        headers: {
          "Content-Type": "application/manifest+json",
        },
      }
    )
  }
  next()
}

export default serveManifest
