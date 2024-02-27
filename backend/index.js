import fs from "fs"
import https from "https"
import path from "path"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import serveManifest from "./src/middlewares/serve-manifest.js"
import imagesRoutes from "./src/routes/images.routes.js"
import infoCardsRoutes from "./src/routes/infocards.routes.js"
import interactionRoutes from "./src/routes/interactions.routes.js"
import pointsRoutes from "./src/routes/points.routes.js"
import trailsRoutes from "./src/routes/trails.routes.js"
import treeCardsRoutes from "./src/routes/treecards.routes.js"
import treesRoutes from "./src/routes/trees.routes.js"
import usersRoutes from "./src/routes/users.routes.js"

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
/*
app.use(
  cors({
    origin: [process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN3],
  })
)
*/
app.use(
  cors({
    origin: "*",
  })
)

app.use(express.json())
app.use(serveManifest)
app.use("/api/", imagesRoutes)
app.use("/api/", infoCardsRoutes)
app.use("/api/", pointsRoutes)
app.use("/api/", trailsRoutes)
app.use("/api/", treeCardsRoutes)
app.use("/api/", treesRoutes)
app.use("/api/", usersRoutes)
app.use("/api/", interactionRoutes)

// Configuración de HTTPS
/*
const httpsOptions = {
  key: fs.readFileSync(path.join(path.resolve(), "192.168.159.129+3-key.pem")),
  cert: fs.readFileSync(path.join(path.resolve(), "192.168.159.129+3.pem")),
}


// Crear servidor HTTPS
https.createServer(httpsOptions, app).listen(3000, () => {
  console.log("HTTPS server running on port 3000")
})
*/

app.listen(3000, () => {
  console.log("Running on port 3000")
});