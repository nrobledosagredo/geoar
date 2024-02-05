import fs from "fs"
import https from "https"
import path from "path"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import serveManifest from "./src/middlewares/serve-manifest.js"
import imageProxyRoutes from "./src/routes/image-proxy.routes.js"
import infoCardRoutes from "./src/routes/info-card.routes.js"
import pointRoutes from "./src/routes/point.routes.js"
import trailRoutes from "./src/routes/trail.routes.js"
import treeCardRoutes from "./src/routes/tree-card.routes.js"
import treeRoutes from "./src/routes/tree.routes.js"

dotenv.config()

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)
const database = mongoose.connection

database.on("error", (error) => {
  console.error(error)
})

database.once("connected", () => {
  console.log("Database Connected")
})

const app = express()

// Habilitar CORS
app.use(
  cors({
    origin: [process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN3],
  })
)

app.use(express.json())
app.use(serveManifest)
app.use("/api/", imageProxyRoutes)
app.use("/api/", infoCardRoutes)
app.use("/api/", pointRoutes)
app.use("/api/", trailRoutes)
app.use("/api/", treeCardRoutes)
app.use("/api/", treeRoutes)

// Configuración de HTTPS
const httpsOptions = {
  key: fs.readFileSync(path.join(path.resolve(), "192.168.159.129+3-key.pem")),
  cert: fs.readFileSync(path.join(path.resolve(), "192.168.159.129+3.pem")),
}

// Crear servidor HTTPS
https.createServer(httpsOptions, app).listen(3000, () => {
  console.log("HTTPS server running on port 3000")
})
