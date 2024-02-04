require("dotenv").config();
const fs = require("fs");
const path = require('path');
const https = require("https");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const serveManifest = require('./src/middlewares/serveManifest');

const mongoString = process.env.DATABASE_URL;

const imageProxyRoutes = require("./src/routes/imageProxy");
const infoCardsRoutes = require("./src/routes/infoCards");
const pointsRoutes = require("./src/routes/points");
const trailsRoutes = require("./src/routes/trails");
const treeCardsRoutes = require("./src/routes/treeCards");
const treesRoutes = require("./src/routes/trees");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();

// Habilitar CORS
app.use(
  cors({
    origin: [process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN3],
  })
);

app.use(express.json());
app.use(serveManifest);
app.use("/api/", imageProxyRoutes);
app.use("/api/", infoCardsRoutes);
app.use("/api/", pointsRoutes);
app.use("/api/", trailsRoutes);
app.use("/api/", treeCardsRoutes);
app.use("/api/", treesRoutes);

// Configuración de HTTPS
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '192.168.159.129+3-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '192.168.159.129+3.pem'))
};

// Crear servidor HTTPS
https.createServer(httpsOptions, app).listen(3000, () => {
  console.log("HTTPS server running on port 3000");
});
